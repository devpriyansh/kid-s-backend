import { StatusCodes } from 'http-status-codes'

export const RequestInputValidationErrorType = {
  name: 'RequestInputValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Please check the request data',
  errorCode: 3001
}

export const ResponseValidationErrorType = {
  name: 'ResponseInputValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: false,
  description:
    'Response validation failed please refer json schema of response',
  errorCode: 3002
}

export const StateNotFoundErrorType = {
  name: 'StateNotFoundError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description:
    'State not found with given criteria',
  errorCode: 3083
}

export const CastleFilterProxyDetectedErrorType = {
  name: 'CastleFilterProxyDetectedError',
  statusCode: StatusCodes.FORBIDDEN,
  isOperational: true,
  description: 'VPNs and proxies aren’t allowed while using Eazy6. Please turn it off to continue.',
  errorCode: 4091
}

export const SocketRequestInputValidationErrorType = {
  name: 'SocketRequestInputValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Please check the request data',
  errorCode: 3003
}

export const RecentEmailChangeErrorType = {
  name: 'RecentEmailChangeError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'For security reasons, sensitive operations are disabled for 24 hours after an email address change. Please try again later.',
  errorCode: 3010
}

export const SocketResponseValidationErrorType = {
  name: 'SocketResponseValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: false,
  description:
    'Response validation of socket failed please refer json schema of response',
  errorCode: 3004
}

export const InvalidOrExpiredTokenErrorType = {
  name: 'InvalidOrExpiredTokenError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Invalid or expired verification code.',
  errorCode: 3021
}

export const MonthlyRedemptionLimitErrorType = {
  name: 'MonthlyRedemptionLimitError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Monthly redemption limit reached ($30). Try again next month.',
  errorCode: 3022
}

export const InsufficientPointsErrorType = {
  name: 'InsufficientPointsError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Not enough points to redeem this.',
  errorCode: 3025
}

export const InsufficientGiftCardBalanceErrorType = {
  name: 'InsufficientGiftCardBalanceError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Not enough gift card balance to complete this.',
  errorCode: 3026
}

export const InvalidTangoBrandIdErrorType = {
  name: 'InvalidTangoBrandIdError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'That gift card brand isn’t available. Please choose another.',
  errorCode: 3024
}

export const InvalidRewardAmountErrorType = {
  name: 'InvalidRewardAmountError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'That amount isn’t available for this gift card. Please choose a different amount.',
  errorCode: 3023
}

export const PointsInconsistencyErrorType = {
  name: 'PointsInconsistencyErrorType',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Your points didn’t sync. Please refresh and try again.',
  errorCode: 3022
}

export const InsufficientBalanceErrorType = {
  name: 'InsufficientBalanceErrorType',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Not enough balance. Add funds to keep playing.',
  errorCode: 3021
}

export const PendingWithdrawalReviewErrorType = {
  name: 'PendingWithdrawalReviewError',
  statusCode: StatusCodes.FORBIDDEN,
  isOperational: true,
  description: 'You currently have a withdrawal request pending security review. Please wait for it to be processed before requesting another.',
  errorCode: 4032
}

export const MinimumWithdrawalErrorType = {
  name: 'MinimumWithdrawalError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Minimum withdrawal amount is $10.',
  errorCode: 4033
}

export const MinimumWithdrawalRuleErrorType = {
  name: 'MinimumWithdrawalRuleError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Minimum withdrawal amount is $10.',
  errorCode: 4033
}

export const ReKycRequiredErrorType = {
  name: 'ReKycRequiredError',
  statusCode: StatusCodes.FORBIDDEN,
  isOperational: true,
  description: 'For your security and to comply with regulations, we need to verify your identity.',
  errorCode: 4034
}

export const StepUpKycRequiredErrorType = {
  name: 'StepUpKycRequiredError',
  statusCode: StatusCodes.FORBIDDEN,
  isOperational: true,
  description: 'To continue, we need a quick selfie check to verify your identity.',
  errorCode: 4035
}

export const ValidationEmailError = {
  name: 'ValidationEmailError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'User email is required for gift card delivery.',
  errorCode: 3021
}

export const AgeRestrictionErrorType = {
  name: 'AgeRestrictionError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'You must meet the minimum age requirement to use this service in your state.',
  errorCode: 3023
}

export const InternalServerErrorType = {
  name: 'InternalServerError',
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  isOperational: true,
  description: 'Something went wrong on our side. Please try again.',
  errorCode: 3005
}

export const BrandIdRequiredErrorType = {
  name: 'BrandIdRequiredErrorType',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Brand Id is required',
  errorCode: 3005
}

export const DepositLimitExceededErrorType = {
  name: 'DepositLimitExceeded',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Deposit didn’t go through — you’ve reached your deposit limit.',
  errorCode: 3003
}

export const InvalidSocketArgumentErrorType = {
  name: 'InvalidSocketArgumentError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description:
    'Please provide, proper arguments eventName, [payloadObject], and [callback]',
  errorCode: 3006
}

export const EmailAlreadyExistErrorType = {
  name: 'EmailAlreadyExistError',
  statusCode: StatusCodes.UNAUTHORIZED,
  isOperational: true,
  description: 'User email already exists',
  errorCode: 401
}

export const CastleRateLimitErrorType = {
  name: 'CastleRateLimitError',
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
  isOperational: true,
  description: 'Too many requests sent to Castle API',
  errorCode: 429
}

export const AlreadyExistErrorType = {
  name: 'EmailAlreadyExistError',
  statusCode: StatusCodes.UNAUTHORIZED,
  isOperational: true,
  description: 'User email already exists',
  errorCode: 401
}

export const RateLimitExceededErrorType = {
  name: 'RateLimitExceededError',
  statusCode: StatusCodes.TOO_MANY_REQUESTS, // 429
  isOperational: true,
  // description: "Too many OTP requests. Please try again later.",
  description: 'Too many tries. Please wait and try again. If it continues, contact support.',
  errorCode: 429
}

export const PromoCodeNotFoundErrorType = {
  name: 'PromoCodeNotFoundError',
  statusCode: StatusCodes.UNAUTHORIZED,
  isOperational: true,
  description: 'That promo code isn’t valid. Please check it and try again.',
  errorCode: 401
}

export const PromoCodeExpiredErrorType = {
  name: 'PromoCodeExpiredError',
  statusCode: StatusCodes.UNAUTHORIZED,
  isOperational: true,
  description: 'Promo code has expired.',
  errorCode: 402
}

export const MultipleAccountsNotAllowedErrorType = {
  name: 'MultipleAccountsNotAllowedError',
  statusCode: StatusCodes.FORBIDDEN,
  isOperational: true,
  description: 'Only one account is allowed per device. Contact support if you need help.',
  errorCode: 403
}

export const PasswordMismatchErrorType = {
  name: 'PasswordMismatchError',
  statusCode: StatusCodes.CONFLICT,
  isOperational: true,
  description: 'Passwords don’t match.',
  errorCode: 3007
}

export const SamePasswordErrorType = {
  name: 'SamePasswordError',
  statusCode: StatusCodes.CONFLICT,
  isOperational: true,
  description: 'New password must be different from your current password.',
  errorCode: 3010
}

export const UsernameIsBadExistsErrorType = {
  name: 'UsernameIsBadExistsErrorType',
  statusCode: StatusCodes.CONFLICT, // Conflict indicates duplicate resource
  isOperational: true,
  description: 'That username isn’t allowed',
  errorCode: 3008
}

export const jackpotIsBadExistsErrorType = {
  name: 'jackpotIsBadExistsErrorType',
  statusCode: StatusCodes.CONFLICT, // Conflict indicates duplicate resource
  isOperational: true,
  description: 'That jackpot mode is required',
  errorCode: 3008
}

export const AppAttestInvalidSignCountErrorType = {
  name: 'AppAttestInvalidSignCountError',
  statusCode: StatusCodes.FORBIDDEN,
  isOperational: true,
  description: 'Security check didn’t complete. Restart the app and try again.',
  errorCode: 3021
}

export const AppAttestInvalidSignatureErrorType = {
  name: 'AppAttestInvalidSignatureError',
  statusCode: StatusCodes.FORBIDDEN, // Authenticated user, but device verification failed
  isOperational: true,
  description: 'Security check didn’t complete. Restart the app and try again. ',
  errorCode: 3022
}

export const UsernameAlreadyExistErrorType = {
  name: 'UsernameAlreadyExistError',
  statusCode: StatusCodes.CONFLICT, // Conflict indicates duplicate resource
  isOperational: true,
  description: 'That username is taken. Try another one.',
  errorCode: 3008
}

export const DeviceCheckFailedErrorType = {
  name: 'DeviceCheckFailedError',
  statusCode: StatusCodes.FORBIDDEN, // Device trust / security failure
  isOperational: true,
  description: 'We couldn’t verify this device. Please try again.',
  errorCode: 3019
}

export const SessionCreationErrorType = {
  name: 'SessionCreationError',
  statusCode: StatusCodes.FORBIDDEN,
  isOperational: true,
  description: 'We couldn’t sign you in. Please try again.',
  errorCode: 3019
}

export const UsernameCheckFailedErrorType = {
  name: 'UsernameCheckFailedError',
  statusCode: StatusCodes.CONFLICT, // Conflict indicates duplicate resource
  isOperational: true,
  description: 'We couldn’t check that username right now. Please try again.',
  errorCode: 3008
}

export const PhoneAlreadyExistErrorType = {
  name: 'PhoneAlreadyExistError',
  statusCode: StatusCodes.CONFLICT, // Conflict indicates duplicate resource
  isOperational: true,
  description: 'User Phone is already exist',
  errorCode: 3008
}

export const EmailAlreadyVerifiedErrorType = {
  name: 'EmailAlreadyVerifiedError',
  statusCode: StatusCodes.CONFLICT, // Conflict indicates duplicate resource
  isOperational: true,
  description: 'User Email is already verified',
  errorCode: 3008
}

export const MobileNotVerifiedErrorType = {
  name: 'MobileNotVerifiedError',
  statusCode: StatusCodes.FORBIDDEN, // 403 – action not allowed until verified
  isOperational: true,
  description: 'User mobile number is not verified',
  errorCode: 3010 // next available error range
}

export const UserNotFoundErrorType = {
  name: 'UserNotFoundError',
  statusCode: StatusCodes.NOT_FOUND, // 404 Not Found for missing resources
  isOperational: true,
  description: 'We couldn’t find an account with that info.',
  errorCode: 3009
}

/**
 * Transaction not found or not eligible for resend
 */
export const TransactionNotFoundErrorType = {
  name: 'TransactionNotFoundErrorType',
  statusCode: StatusCodes.NOT_FOUND, // 404
  isOperational: true,
  description: 'Gift card transaction not found',
  errorCode: 3011
}

/**
 * App Attest device not found or not trusted
 */
export const AppAttestDeviceNotFoundErrorType = {
  name: 'AppAttestDeviceNotFoundErrorType',
  statusCode: StatusCodes.UNAUTHORIZED, // 401
  isOperational: true,
  description: 'We couldn’t verify this device. Please try again.',
  errorCode: 401
}

export const InvalidLocationErrorType = {
  name: 'InvalidLocationErrorType',
  statusCode: StatusCodes.BAD_REQUEST, // 400
  isOperational: true,
  description: 'Invalid or malformed location data',
  errorCode: 400
}

export const LocationNotAllowedErrorType = {
  name: 'LocationNotAllowedErrorType',
  statusCode: StatusCodes.FORBIDDEN, // 403
  isOperational: true,
  description: 'Sorry, you must be in an eligible state to play.',
  errorCode: 403
}

export const LocationPermissionErrorType = {
  name: 'LocationPermissionError',
  statusCode: StatusCodes.BAD_REQUEST, // 400
  isOperational: true,
  description: 'Location permission is required.',
  errorCode: 404
}

export const LocationAnomalyErrorType = {
  name: 'LocationAnomalyError',
  statusCode: StatusCodes.FORBIDDEN, // 403
  isOperational: true,
  description:
    'We couldn’t confirm your location. Please try again.',
  errorCode: 405
}

export const LocationCheckFailedErrorType = {
  name: 'LocationCheckFailedError',
  statusCode: StatusCodes.SERVICE_UNAVAILABLE, // 503
  isOperational: true,
  description: 'We couldn’t check your location. Try again.',
  errorCode: 406
}

/**
 * User email missing or invalid
 */
export const ValidationEmailErrorType = {
  name: 'ValidationEmailErrorType',
  statusCode: StatusCodes.BAD_REQUEST, // 400
  isOperational: true,
  description: 'User email is required',
  errorCode: 3012
}

/**
 * Tango resend API failure
 */
export const TangoResendFailedErrorType = {
  name: 'TangoResendFailedErrorType',
  statusCode: StatusCodes.BAD_GATEWAY, // 502 (upstream failure)
  isOperational: true,
  description: 'We couldn’t resend the gift card email. Please try again.',
  errorCode: 3013
}

export const InvalidRedemptionTypeErrorType = {
  name: 'InvalidRedemptionTypeError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'That redemption option isn’t valid. Please try again.',
  errorCode: 3013
}

export const NewPasswordSameAsCurrentErrorType = {
  name: 'NewPasswordSameAsCurrentError',
  statusCode: StatusCodes.BAD_REQUEST, // 400 - user input error
  isOperational: true,
  description: 'New password cannot be the same as the current password',
  errorCode: 3010
}

export const MissingPhoneErrorType = {
  name: 'MissingPhoneError',
  statusCode: StatusCodes.BAD_REQUEST, // Missing required field from user
  isOperational: true,
  description: 'No phone number is associated with this account',
  errorCode: 3010
}

export const PhoneAlreadyExistsErrorType = {
  name: 'PhoneAlreadyExistsError',
  statusCode: StatusCodes.CONFLICT, // Conflict indicates duplicate resource
  isOperational: true,
  description: 'User phone number already exists',
  errorCode: 3009
}

export const UsernameAlreadyExistsErrorType = {
  name: 'UsernameAlreadyExistsError',
  statusCode: StatusCodes.CONFLICT, // 409 Conflict for duplicate resource
  isOperational: true,
  description: 'The chosen username is already in use by another account',
  errorCode: 3010
}

export const UsernameChangeLimitErrorType = {
  name: 'UsernameChangeLimitError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'You can only change your username 2 times',
  errorCode: 3012
}

export const PreferencesNotFoundErrorType = {
  name: 'PreferencesNotFoundError',
  statusCode: StatusCodes.NO_CONTENT, // 404 Not Found for missing resources
  isOperational: true,
  description: 'We couldn’t load your preferences yet. Please try again.',
  errorCode: 3009
}

export const AlreadyVipErrorType = {
  name: 'ALREADY_VIP_ERROR',
  statusCode: StatusCodes.BAD_REQUEST, // 400 Bad Request
  isOperational: true,
  description: 'User is already a VIP member.',
  errorCode: 3010
}

export const PlanNotFoundErrorType = {
  name: 'PLAN_NOT_FOUND_ERROR',
  statusCode: StatusCodes.NOT_FOUND, // 404 Not Found
  isOperational: true,
  description: 'VIP subscription plan not found.',
  errorCode: 3011
}

export const InsufficientFundsErrorType = {
  name: 'INSUFFICIENT_FUNDS_ERROR',
  statusCode: StatusCodes.BAD_REQUEST, // 400 Bad Request
  isOperational: true,
  description: 'Insufficient balance to upgrade to VIP.',
  errorCode: 3012
}

export const UserResetTokenInvalidErrorType = {
  name: 'UserResetTokenInvalidError',
  statusCode: StatusCodes.NOT_FOUND, // 404 Not Found for missing resources
  isOperational: true,
  description: 'Invalid Reset code',
  errorCode: 3009
}

export const InvalidCredentialsErrorType = {
  name: 'InvalidCredentialsError',
  statusCode: StatusCodes.UNAUTHORIZED, // 401 Unauthorized for invalid login credentials
  isOperational: true,
  description: 'Invalid email or password',
  errorCode: 3010
}
export const InvalidPasswordErrorType = {
  name: 'InvalidPasswordErrorError',
  statusCode: StatusCodes.UNAUTHORIZED, // 401 Unauthorized for invalid login credentials
  isOperational: true,
  description: 'Incorrect password. Please try again.',
  errorCode: 3010
}

export const EmailSendingErrorType = {
  name: 'EmailSendingErrorError',
  statusCode: StatusCodes.UNAUTHORIZED, // 401 Unauthorized for invalid login credentials
  isOperational: true,
  description: 'We couldn’t send the email. Please try again.',
  errorCode: 3010
}

export const SmsSendingErrorType = {
  name: 'SmsSendingErrorError',
  statusCode: StatusCodes.UNAUTHORIZED, // 401 Unauthorized for invalid login credentials
  isOperational: true,
  description: 'We couldn’t send a code. Please try again.',
  errorCode: 3010
}
export const InvalidCurrentPasswordErrorType = {
  name: 'InvalidCurrentPasswordErrorError',
  statusCode: StatusCodes.UNAUTHORIZED, // 401 Unauthorized for invalid login credentials
  isOperational: true,
  description: 'Current password is incorrect.',
  errorCode: 3010
}
export const InvalidEmailErrorType = {
  name: 'InvalidEmailError',
  statusCode: StatusCodes.CONFLICT,
  isOperational: true,
  description: 'Entered Email is not in a valid format.',
  errorCode: 3011
}
export const ExpiredResetTokenErrorType = {
  name: 'ExpiredResetTokenError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'The reset token has expired. Please request a new reset token.',
  errorCode: 3012
}

export const InvalidResetTokenErrorType = {
  name: 'InvalidResetTokenError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description:
    'The reset token provided is invalid. Please check the token and try again.',
  errorCode: 3013
}

export const MissingResetTokenErrorType = {
  name: 'MissingResetTokenError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description:
    'No reset token was provided. Please provide a valid reset token.',
  errorCode: 3014
}

export const ResetTokenMismatchErrorType = {
  name: 'ResetTokenMismatchError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description:
    'The reset token does not match the one on record. Please try again.',
  errorCode: 3015
}

export const PasswordResetErrorType = {
  name: 'PasswordResetError',
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  isOperational: true,
  description:
    'There was an error while resetting the password. Please try again later.',
  errorCode: 3016
}

export const ResetTokenAlreadyUsedErrorType = {
  name: 'ResetTokenAlreadyUsedError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description:
    'The reset token has already been used. Please request a new token.',
  errorCode: 3017
}

export const UserAlreadyResetPasswordErrorType = {
  name: 'UserAlreadyResetPasswordError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description:
    'User has already reset their password. A new reset request is required.',
  errorCode: 3018
}

export const TooManyResetAttemptsErrorType = {
  name: 'TooManyResetAttemptsError',
  statusCode: StatusCodes.FORBIDDEN, // Forbidden for excessive attempts
  isOperational: true,
  description:
    'Too many reset attempts have been made. Please try again later.',
  errorCode: 3019
}

export const InvalidPasswordFormatErrorType = {
  name: 'InvalidPasswordFormatError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'The provided password does not meet the required format.',
  errorCode: 3020
}

export const NoTransactionsFoundErrorType = {
  name: 'NoTransactionsFoundError',
  statusCode: 204, // No Content
  isOperational: true,
  description: 'No transactions found for the user.',
  errorCode: 3021
}

export const CastleNotAvailableErrorType = {
  name: 'CastleNotAvailableError',
  statusCode: 503, // Service Unavailable
  isOperational: true,
  description: 'Castle service is temporarily unavailable.',
  errorCode: 7001
}

export const SettingsNotFoundErrorType = {
  name: 'SettingsNotFoundError',
  statusCode: 204, // No Content
  isOperational: true,
  description: 'No Responsible gaming Settings found for the user.',
  errorCode: 3021
}

export const BonusPlaythroughErrorType = {
  name: 'BonusPlaythroughError',
  statusCode: 401, // Forbidden
  isOperational: true,
  description:
    'You must play through at least your first time received bonus amount before withdrawing.',
  errorCode: 3022
}

export const DepositPlaythroughErrorType = {
  name: 'DepositPlaythroughError',
  statusCode: 401, // Forbidden
  isOperational: true,
  description:
    'You must play through at least your first time deposited amount and same amount of EazyBucks you get on first deposit before withdrawing.',
  errorCode: 3023
}

export const PromoCodeInvalidErrorType = {
  name: 'PromoCodeInvalidError',
  statusCode: 400, // Bad Request
  isOperational: true,
  description: 'Promo code is not valid at this time.',
  errorCode: 3024
}

export const SelfExclusionActiveErrorType = {
  name: 'SelfExclusionActiveError',
  statusCode: 401, // Forbidden
  isOperational: true,
  description:
    'Your account is self‑excluded. Contact support if you have questions.',
  errorCode: 3031
}

export const ComplianceLockoutErrorType = {
  name: 'ComplianceLockoutError',
  statusCode: 403,
  isOperational: true,
  description:
    'This service are currently disabled for your account due to a responsible gaming restriction.',
  errorCode: 3032
}

export const InvalidSocialTokenErrorType = {
  name: 'InvalidSocialTokenError',
  statusCode: 401, // Unauthorized
  isOperational: true,
  description: 'Social token verification failed.',
  errorCode: 4010
}
export const TokenExpiredErrorType = {
  name: 'TokenExpiredError',
  statusCode: 401, // Unauthorized
  isOperational: true,
  description: 'Your session expired. Please log in again.',
  errorCode: 4011
}

/**
 * Castle: Missing or invalid request token (device fingerprint)
 */
export const InvalidCastleRequestTokenErrorType = {
  name: 'InvalidCastleRequestTokenError',
  statusCode: StatusCodes.BAD_REQUEST, // 400
  isOperational: true,
  description: 'Invalid or missing Castle request token.',
  errorCode: 7002
}

/**
 * Castle: Missing or invalid request token (device fingerprint)
 */
export const CastleValidationRequiredErrorType = {
  name: 'CastleValidationRequiredError',
  statusCode: StatusCodes.BAD_REQUEST, // 400
  isOperational: true,
  description: 'We couldn’t verify your device. Please try again.',
  errorCode: 7002
}

/**
 * Castle Filter API failed
 */
export const CastleFilterFailedErrorType = {
  name: 'CastleFilterFailedError',
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR, // 500
  isOperational: true,
  description: 'We couldn’t complete a security check. Please try again.',
  errorCode: 7003
}

/**
 * Castle Risk API failed
 */
export const CastleRiskFailedErrorType = {
  name: 'CastleRiskFailedError',
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR, // 500
  isOperational: true,
  description: 'We couldn’t complete a security check. Please try again. ',
  errorCode: 7004
}

/**
 * Castle: Missing or invalid user ID (post-login actions)
 */
export const InvalidCastleUserErrorType = {
  name: 'InvalidCastleUserError',
  statusCode: StatusCodes.BAD_REQUEST, // 400
  isOperational: true,
  description: 'User ID is missing or invalid for Castle Risk evaluation.',
  errorCode: 7005
}

/**
 * Castle: Timeout or AbortError
 */
export const CastleTimeoutErrorType = {
  name: 'CastleTimeoutError',
  statusCode: StatusCodes.GATEWAY_TIMEOUT, // 504
  isOperational: true,
  description: 'Castle service timed out while processing the request.',
  errorCode: 7006
}

export const CastleTokenMissingErrorType = {
  name: 'CastleTokenMissingError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'We need to verify your device. Please try again.',
  errorCode: 7006
}

export const PhoneNumberInvalidErrorType = {
  name: 'PhoneNumberInvalidError',
  statusCode: 400,
  isOperational: true,
  description: 'Phone number validation failed.',
  errorCode: 7201
}

export const PhoneValidationTimeoutErrorType = {
  name: 'PhoneValidationTimeoutError',
  statusCode: 504,
  isOperational: true,
  description: 'Phone validation request timed out.',
  errorCode: 7202
}

export const CastleDeniedErrorType = {
  name: 'CastleDeniedError',
  statusCode: 403,
  isOperational: true,
  description: 'Request denied due to device or risk policy.',
  errorCode: 7301
}

export const PhoneCountryNotSupportedErrorType = {
  name: 'PhoneCountryNotSupportedError',
  statusCode: 400,
  isOperational: true,
  description: 'Phone country not supported.',
  errorCode: 7003
}

export const PhoneCarrierInvalidErrorType = {
  name: 'PhoneCarrierInvalidError',
  statusCode: 400,
  isOperational: true,
  description: 'Invalid phone carrier.',
  errorCode: 7004
}

export const ValidationError = {
  name: 'ValidationError',
  statusCode: StatusCodes.BAD_REQUEST,
  isOperational: true,
  description: 'Validation failed',
  errorCode: 3001
}

export const NotFoundError = {
  name: 'NotFoundError',
  statusCode: StatusCodes.NOT_FOUND,
  isOperational: true,
  description: 'Resource not found',
  errorCode: 3009
}

export const DepositFailedErrorType = {
  name: 'DepositFailedError',
  statusCode: 500,
  isOperational: true,
  description: 'Deposits are temporarily unavailable. Please try again later.',
  errorCode: 7005
}

export const WithdrawalFailedErrorType = {
  name: 'WithdrawalFailedError',
  statusCode: 500,
  isOperational: true,
  description: 'Withdrawal didn’t go through. Please try again later. If the issue persists, contact support.',
  errorCode: 7006
}

export const ValidationEmailTangoErrorType = {
  name: 'ValidationEmailTangoError',
  statusCode: 400,
  isOperational: true,
  description: 'Add an email in Settings to access gift cards. ',
  errorCode: 7007
}

export const ValidationEmailResendTangoErrorType = {
  name: 'ValidationEmailResendTangoErrorType',
  statusCode: 400,
  isOperational: true,
  description: 'Add an email in Settings to resend your gift card. ',
  errorCode: 7008
}

export const VonageValidationFailedErrorType = {
  name: 'VonageValidationFailedError',
  statusCode: 403,
  isOperational: true,
  description: 'We couldn’t verify that phone number. Please check it and try again.',
  errorCode: 7008
}

export const CastleDeniedDepositErrorType = {
  name: 'CastleDeniedDepositError',
  statusCode: 403,
  isOperational: true,
  description: 'For your security, deposits are currently unavailable. Contact support if you need help.',
  errorCode: 7009
}

export const CastleDeniedWithdrawErrorType = {
  name: 'CastleDeniedWithdrawError',
  statusCode: 403,
  isOperational: true,
  description: 'For your security, withdrawals are currently unavailable. Contact support if you need help.',
  errorCode: 7010
}

export const CastleWithdrawServiceUnavailableErrorType = {
  name: 'CastleWithdrawServiceUnavailableError',
  statusCode: 503,
  isOperational: true,
  description: 'Withdrawals are temporarily unavailable. Please try again later',
  errorCode: 7011
}

export const TrustedDeviceStorageErrorType = {
  name: 'TrustedDeviceStorageError',
  statusCode: 503,
  isOperational: true,
  description: 'We couldn’t complete device verification. Try again. ',
  errorCode: 7011
}

export const UserLoginFailedErrorType = {
  name: 'UserLoginFailedError',
  statusCode: 401,
  isOperational: true,
  description: 'Sign‑in didn’t work. Please try again.',
  errorCode: 7012
}

export const InvalidTokenErrorType = {
  name: 'InvalidTokenError',
  statusCode: 400,
  isOperational: true,
  description: 'Invalid or expired verification token.',
  errorCode: 7013
}

// ─── Delete My Account flow ───────────────────────────────────────────────────

export const LiveEntriesBlockDeletionErrorType = {
  name: 'LiveEntriesBlockDeletionError',
  statusCode: 409,
  isOperational: true,
  description:
    "You have contest entries that are still being scored. Your account can't be deleted until they settle.",
  errorCode: 8001
}

export const OpenEntriesMustBeCancelledErrorType = {
  name: 'OpenEntriesMustBeCancelledError',
  statusCode: 409,
  isOperational: true,
  description:
    'You have open contest entries. Please cancel them before deleting your account.',
  errorCode: 8002
}

export const WalletNotEmptyErrorType = {
  name: 'WalletNotEmptyError',
  statusCode: 409,
  isOperational: true,
  description:
    'Your wallet still has a balance. Please withdraw it before deleting your account.',
  errorCode: 8003
}

export const ClosureWithdrawalFailedErrorType = {
  name: 'ClosureWithdrawalFailedError',
  statusCode: 500,
  isOperational: true,
  description:
    "Something went wrong sending your balance. Your money is safe and your account hasn't been changed. Please try again.",
  errorCode: 8004
}

export const NoEligiblePayoutMethodErrorType = {
  name: 'NoEligiblePayoutMethodError',
  statusCode: 422,
  isOperational: true,
  description:
    "The payment method you originally used isn't available. Please add a new payout method to continue.",
  errorCode: 8005
}

export const PaysafeReviewPendingErrorType = {
  name: 'PaysafeReviewPendingError',
  statusCode: 202,
  isOperational: true,
  description:
    'Your withdrawal is being reviewed for security. Your account stays open until it clears.',
  errorCode: 8006
}

export const GracePeriodExpiredErrorType = {
  name: 'GracePeriodExpiredError',
  statusCode: 410,
  isOperational: true,
  description:
    'Your reactivation window has passed. Your account has been permanently closed.',
  errorCode: 8007
}

export const AccountSoftDeletedErrorType = {
  name: 'AccountSoftDeletedError',
  statusCode: 403,
  isOperational: true,
  description:
    'Your account is pending deletion. Log back in within the grace period to reactivate it.',
  errorCode: 8008
}
