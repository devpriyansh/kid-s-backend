/**
 * KYC Trigger Engine
 * ──────────────────────────────────────────────────────────────────────────
 * Single source of truth for all reKYC trigger decisions.
 * Services call evaluateKycTriggers(user, context) and act on the result.
 *
 * Result shape:
 *   {
 *     action:       "NONE" | "STEP_UP" | "FULL_KYC" | "DATA_CHECK" | "LOCK",
 *     triggerKey:   string,                  // event key from Master Trigger Table
 *     resetType:    "DOCUMENT" | "STEP_SELFIE" | null,
 *     blockWithdrawal: boolean,
 *     reason:       string,                  // human-readable log string
 *   }
 *
 * Usage (deposit/withdraw services):
 *   import { evaluateKycTriggers } from "../../helpers/kyc/kycTriggerEngine.helper";
 *   const kycResult = evaluateKycTriggers(user, { amount, totalDeposited30Days, actionType });
 *   if (kycResult.action !== "NONE") { ... trigger reKYC flow ... }
 * ──────────────────────────────────────────────────────────────────────────
 */

import moment from 'moment-timezone'

// ── Constants ──────────────────────────────────────────────────────────────
const FULL_KYC_REUSE_HOURS = 48 // high-value window
const STEPUP_COOLDOWN_HOURS = 24 // selfie cooldown
const DORMANT_DAYS = 365 // no login threshold
const HIGH_VALUE_THRESHOLD = 2000 // single txn triggers high-value check
const ROLLING_30D_THRESHOLD = 5000 // 30-day deposit triggers rolling-volume check
const HIGH_RISK_SCORE = 70 // Sumsub score >= this → escalate to FULL

// ── Helpers ────────────────────────────────────────────────────────────────
const hoursSince = (ts) =>
  ts ? moment().diff(moment(ts), 'hours', true) : Infinity

const daysSince = (ts) =>
  ts ? moment().diff(moment(ts), 'days', true) : Infinity

const isHighRisk = (user) =>
  !!user.amlFlag || (user.sumsubRiskScore != null && user.sumsubRiskScore >= HIGH_RISK_SCORE)

// ── Result builders ────────────────────────────────────────────────────────
const NONE = (key = 'none', reason = 'No KYC action required') =>
  ({ action: 'NONE', triggerKey: key, resetType: null, blockWithdrawal: false, reason })

const STEP_UP = (key, reason) =>
  ({ action: 'STEP_UP', triggerKey: key, resetType: 'STEP_SELFIE', blockWithdrawal: false, reason })

const FULL_KYC = (key, reason, blockWithdrawal = false) =>
  ({ action: 'FULL_KYC', triggerKey: key, resetType: 'DOCUMENT', blockWithdrawal, reason })

const DATA_CHECK = (key, reason) =>
  ({ action: 'DATA_CHECK', triggerKey: key, resetType: null, blockWithdrawal: false, reason })

const LOCK = (key, reason) =>
  ({ action: 'LOCK', triggerKey: key, resetType: 'DOCUMENT', blockWithdrawal: true, reason })

// ─────────────────────────────────────────────────────────────────────────
//  MAIN EVALUATOR
//  context = { amount?, totalDeposited30Days?, actionType, totalDepositsLifetime? }
// ─────────────────────────────────────────────────────────────────────────
export const evaluateKycTriggers = (user, context = {}) => {
  const {
    amount = 0,
    totalDeposited30Days = 0,
    totalDepositsLifetime = 0,
    actionType = 'deposit' // "deposit" | "withdrawal"
  } = context

  // ── 1. initial_kyc_required ─────────────────────────────────────────────
  // First deposit by a user who hasn't verified yet.
  if (totalDepositsLifetime >= 1 && !user.isKYCVerification) {
    return FULL_KYC('initial_kyc_required', 'KYC required before first deposit.')
  }

  // ── 2. restricted_state ─────────────────────────────────────────────────
  // Defined via existing geo-fence; checked at route level — not here.
  // Included as a reminder; the geo layer handles this before we reach this fn.

  // ── 3. aml_risk_trigger ─────────────────────────────────────────────────
  // No cooldown — always FULL, always block withdrawals.
  if (isHighRisk(user)) {
    return FULL_KYC(
      'aml_risk_trigger',
      `AML flag or Sumsub risk score (${user.sumsubRiskScore}) triggered.`,
      actionType === 'withdrawal'
    )
  }

  // ── 4. kyc_expired_id ───────────────────────────────────────────────────
  if (user.sumsubIdExpirationDate) {
    const today = moment().startOf('day')
    const expiry = moment(user.sumsubIdExpirationDate).startOf('day')
    if (today.isAfter(expiry)) {
      return FULL_KYC('kyc_expired_id', `ID expired on ${user.sumsubIdExpirationDate}.`)
    }
  }

  // ── 5. dormant_account ──────────────────────────────────────────────────
  if (user.lastLoginAt && daysSince(user.lastLoginAt) >= DORMANT_DAYS) {
    return FULL_KYC(
      'dormant_account',
      `Account dormant: last login ${Math.floor(daysSince(user.lastLoginAt))} days ago.`
    )
  }

  // ── 6. high_value_txn ───────────────────────────────────────────────────
  if (amount >= HIGH_VALUE_THRESHOLD) {
    // 48h full KYC reuse → allow
    if (hoursSince(user.lastFullKycVerifiedAt) <= FULL_KYC_REUSE_HOURS) {
      return NONE('high_value_txn', 'High-value allowed: Full KYC within 48h.')
    }
    // 24h selfie cooldown → allow
    if (hoursSince(user.lastStepupCheckAt) <= STEPUP_COOLDOWN_HOURS) {
      return NONE('high_value_txn', 'High-value allowed: selfie step-up within 24h.')
    }
    // Need step-up (selfie only)
    return STEP_UP(
      'high_value_txn',
      `Transaction $${amount} >= $${HIGH_VALUE_THRESHOLD}: selfie step-up required.`
    )
  }

  // ── 7. rolling_volume ───────────────────────────────────────────────────
  if (totalDeposited30Days >= ROLLING_30D_THRESHOLD) {
    // 24h selfie cooldown already satisfied → allow
    if (hoursSince(user.lastStepupCheckAt) <= STEPUP_COOLDOWN_HOURS) {
      return NONE('rolling_volume', 'Rolling volume: selfie step-up already within 24h.')
    }
    return STEP_UP(
      'rolling_volume',
      `30-day deposits $${totalDeposited30Days} >= $${ROLLING_30D_THRESHOLD}: selfie step-up required.`
    )
  }

  return NONE()
}

// ─────────────────────────────────────────────────────────────────────────
//  PROFILE-CHANGE TRIGGER (used by updateUserProfile service)
//  Returns FULL_KYC if identity fields changed, DATA_CHECK for address.
// ─────────────────────────────────────────────────────────────────────────
export const evaluateProfileChangeTrigger = (changes = {}) => {
  const { firstNameChanged, lastNameChanged, dobChanged, ssnChanged, addressChanged } = changes

  // Identity → FULL KYC
  if (firstNameChanged || lastNameChanged || dobChanged || ssnChanged) {
    return FULL_KYC(
      'profile_update_identity',
      'Identity field (name / DOB / SSN) changed — full re-verification required.'
    )
  }

  // Address → DATA CHECK only (no Sumsub)
  if (addressChanged) {
    return DATA_CHECK(
      'profile_update_address',
      'Address changed — backend data check only, no Sumsub call.'
    )
  }

  return NONE('profile_update_none')
}

// ─────────────────────────────────────────────────────────────────────────
//  PAYMENT METHOD TRIGGER (used wherever Paysafe callbacks are handled)
// ─────────────────────────────────────────────────────────────────────────
export const evaluatePaymentMethodTrigger = (user, paymentContext = {}) => {
  const { paymentNameMatchesUser = true, newMethodsAdded24h = 0 } = paymentContext

  // Mismatch / velocity → FULL KYC
  if (!paymentNameMatchesUser || newMethodsAdded24h >= 2 || isHighRisk(user)) {
    return FULL_KYC(
      'payment_mismatch_or_velocity',
      'Payment name mismatch or velocity pattern — full KYC required.'
    )
  }

  // Default → DATA CHECK only
  return DATA_CHECK(
    'new_payment_method',
    'New payment method: backend data check + Paysafe validation only.'
  )
}
