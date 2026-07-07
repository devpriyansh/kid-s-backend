import db from '../db/models'
import { getOne } from '../helpers/crud'
import { Op } from 'sequelize'

/**
 * Check if a username is already taken.
 *
 * Checks two sources:
 *  1. `users` table — confirmed registered accounts (permanent block).
 *  2. `otp_verifications` table — active, unverified reservations.
 *     A username stays reserved for the full OTP validity window (2 min)
 *     PLUS a 5-minute grace period after natural expiry, giving a total
 *     block of 7 minutes. This prevents race conditions where two users
 *     try to grab the same name the moment an OTP naturally expires.
 *
 *     Force-expired OTPs (set during a resend) are backdated 6 minutes into
 *     the past so they fall outside this buffer and free the name immediately.
 *
 * @param {string} username
 */
const isUsernameTaken = async (username) => {
  try {
    if (!username || typeof username !== 'string') {
      return {
        taken: false,
        success: false,
        message: 'Invalid username input.'
      }
    }

    const normalizedUsername = username.trim().toLowerCase()

    // Block while OTP is active OR within 5 minutes after natural expiry.
    // OTP lifetime = 2 min → total reservation window = 7 min.
    // Force-expired OTPs (expiresAt set to 6 min in the past) bypass this.
    const bufferMs = 5 * 60 * 1000
    const cutoff = new Date(Date.now() - bufferMs) // now - 5 min

    const [user, otp] = await Promise.all([
      getOne({
        model: db.User,
        data: { userName: normalizedUsername },
        attributes: ['userName']
      }),
      getOne({
        model: db.OtpVerification,
        data: {
          userName: normalizedUsername,
          isVerified: false,
          expiresAt: { [Op.gt]: cutoff } // active + 5-min post-expiry buffer
        },
        attributes: ['userName']
      })
    ])

    if (user || otp) {
      console.log('Username already taken:', {
        username: normalizedUsername,
        source: user ? 'users' : 'otp_verifications'
      })

      return {
        taken: true,
        success: true,
        message: 'Username already taken.',
        source: user ? 'users' : 'otp_verifications'
      }
    }

    return {
      taken: false,
      success: true,
      message: 'Username is available.'
    }
  } catch (error) {
    console.error('Username availability check failed:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    })

    return {
      taken: false,
      success: false,
      message: 'We couldn’t check that username right now. Please try again.',
      error
    }
  }
}

export { isUsernameTaken }
