import { StatusCodes } from 'http-status-codes'

export const messages = {
  PLEASE_CHECK_REQUEST_DATA: 'PLEASE_CHECK_REQUEST_DATA',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  RESPONSE_VALIDATION_FAILED: 'RESPONSE_VALIDATION_FAILED',
  SOCKET_PROVIDE_PROPER_ARGUMENTS: 'SOCKET_PROVIDE_PROPER_ARGUMENTS',
  ACCESS_TOKEN_EXPIRED_OR_NOT_PASSED: 'ACCESS_TOKEN_EXPIRED_OR_NOT_PASSED',
  USER_DOES_NOT_EXISTS: 'USER_DOES_NOT_EXISTS',
  BONUS_ACTIVATE: 'BONUS_ACTIVATE',
  CANCEL_SUCCESS: 'Cancelled',
  USER_INACTIVE: 'USER_INACTIVE',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  USERNAME_NOT_ALLOWED: 'USERNAME_NOT_ALLOWED',
  USERNAME_OR_EMAIL_ALREADY_EXISTS: 'USERNAME_OR_EMAIL_ALREADY_EXISTS',
  USER_NOT_LOGGED_IN: 'USER_NOT_LOGGED_IN',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  USERNAME_IS_TAKEN: 'USERNAME_IS_TAKEN',
  PHONE_IS_TAKEN: 'PHONE_IS_TAKEN',
  LIMIT_NOT_FOUND: 'LIMIT_NOT_FOUND',
  INVALID_TIME_UNIT: 'INVALID_TIME_UNIT',
  INVALID_VALUE: 'INVALID_VALUE',
  EXCLUDED_PERMANENTLY_PLEASE_CONTACT_PROVIDER:
    'EXCLUDED_PERMANENTLY_PLEASE_CONTACT_PROVIDER',
  INVALID_EVENT_ID_COMBINATION: 'INVALID_EVENT_ID_COMBINATION',
  INVALID_WALLET_ID: 'INVALID_WALLET_ID',
  NOT_ENOUGH_AMOUNT: 'NOT_ENOUGH_AMOUNT',
  ACCESS_TOKEN_NOT_FOUND: 'ACCESS_TOKEN_NOT_FOUND',
  BETTING_IS_DIABLED: 'ENTRY_IS_DIABLED',
  MIN_STAKE_REQUIRED: 'MIN_STAKE_REQUIRED',
  ODDS_SHULD_BE_IN_RANGE: 'ODDS_SHULD_BE_IN_RANGE',
  INVALID_SPORT_ID: 'INVALID_SPORT_ID',
  YOUR_COUNTRY_IS_NOT_LISTED: 'YOUR_COUNTRY_IS_NOT_LISTED',
  INVALID_BONUS_ID: 'INVALID_BONUS_ID',
  EXCLUDED_TEMPORARILY: 'EXCLUDED_TEMPORARILY',
  INVALID_ADDRESS_ID: 'INVALID_ADDRESS_ID',
  INVALID_TOKEN: 'INVALID_TOKEN',
  WRONG_TOKEN_TYPE: 'WRONG_TOKEN_TYPE',
  FILE_DOES_NOT_EXISTS: 'FILE_DOES_NOT_EXISTS',
  INVALID_DOCUMENT_LABEL_ID: 'INVALID_DOCUMENT_LABEL_ID',
  DOCUMENT_IS_APPROVED: 'DOCUMENT_IS_APPROVED',
  INVALID_DOCUMENT_ID: 'INVALID_DOCUMENT_ID',
  INVALID_BONUS: 'INVALID_BONUS',
  BONUS_ALREADY_ACTIVE: 'BONUS_ALREADY_ACTIVE',
  CASHOUT_NOT_ALLOWED: 'CASHOUT_NOT_ALLOWED',
  FILE_FORMAT_NOT_SUPPORTED: 'FILE_FORMAT_NOT_SUPPORTED',
  DAILY_BET_LIMIT_EXCEEDED: 'DAILY_ENTRY_LIMIT_EXCEEDED',
  WEEKLY_ENTRY_LIMIT_EXCEEDED: 'WEEKLY_ENTRY_LIMIT_EXCEEDED',
  MONTHLY_BET_LIMIT_EXCEEDED: 'MONTHLY_ENTRY_LIMIT_EXCEEDED',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  CURRENCY_NOT_AVAILABLE: 'CURRENCY_NOT_AVAILABLE',
  BLOCKED_TRANSACTION: 'BLOCKED_TRANSACTION',
  ADDRESS_ALREADY_EXISTS: 'ADDRESS_ALREADY_EXISTS',
  TRANSACTION_ALREADY_EXISTS: 'TRANSACTION_ALREADY_EXISTS',
  TOURNAMENT_DOES_NOT_EXISTS: 'TOURNAMENT_DOES_NOT_EXISTS',
  TOURNAMENT_NOT_ACTIVE: 'TOURNAMENT_NOT_ACTIVE',
  TOURNAMENT_REGISTRATION_CLOSE: 'TOURNAMENT_REGISTRATION_CLOSE',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  USER_ALREADY_ENROLLED_IN_TOURNAMENT: 'USER_ALREADY_ENROLLED_IN_TOURNAMENT',
  USER_ALREADY_NOT_ENROLLED_IN_TOURNAMENT:
    'USER_ALREADY_NOT_ENROLLED_IN_TOURNAMENT',
  TOURNAMENT_PLAYER_LIMIT_REACHED: 'TOURNAMENT_PLAYER_LIMIT_REACHED',
  TOURNAMENT_REBUY_LIMIT_REACHED: 'TOURNAMENT_REBUY_LIMIT_REACHED',
  BONUS_ALREADY_CANCELLED: 'BONUS_ALREADY_CANCELLED',
  EMAIL_ALREADY_VERIFIED: 'EMAIL_ALREADY_VERIFIED',
  EMAIL_ALREADY_EXITS: 'EMAIL_ALREADY_EXITS',
  ADDRESS_ALREADY_EXISTS: 'ADDRESS_ALREADY_EXISTS',
  BONUS_ALREADY_AVAILED: 'BONUS_ALREADY_AVAILED',
  BRAND_ID_IS_REQUIRED: 'BRAND_ID_IS_REQUIRED'
}

export const errorTypes = {
  RequestInputValidationErrorType: {
    name: 'RequestInputValidationError',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: 'Invalid request data', // messages.PLEASE_CHECK_REQUEST_DATA,
    errorCode: 3001
  },
  ResponseValidationErrorType: {
    name: 'ResponseInputValidationError',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: false,
    description: messages.RESPONSE_VALIDATION_FAILED,
    errorCode: 3002
  },
  SocketRequestInputValidationErrorType: {
    name: 'SocketRequestInputValidationError',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.PLEASE_CHECK_REQUEST_DATA,
    errorCode: 3003
  },
  SocketResponseValidationErrorType: {
    name: 'SocketResponseValidationError',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: false,
    description: messages.RESPONSE_VALIDATION_FAILED,
    errorCode: 3004
  },
  InternalServerErrorType: {
    name: 'InternalServerError',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational: true,
    description: messages.INTERNAL_SERVER_ERROR,
    errorCode: 3005
  },

  InvalidSocketArgumentErrorType: {
    name: 'InvalidSocketArgumentError',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.SOCKET_PROVIDE_PROPER_ARGUMENTS,
    errorCode: 3006
  },
  AuthenticationErrorType: {
    name: 'AuthenticationErrorType',
    statusCode: StatusCodes.UNAUTHORIZED,
    isOperational: true,
    description: messages.ACCESS_TOKEN_EXPIRED_OR_NOT_PASSED,
    errorCode: 3007
  },
  UserDoesNotExistsErrorType: {
    name: 'UserDoesNotExistsErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.USER_DOES_NOT_EXISTS,
    errorCode: 3008
  },
  serviceErrorType: {
    name: 'serviceErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: false,
    description: messages.SERVICE_UNAVAILABLE,
    errorCode: 3009
  },
  BonusActivateErrorType: {
    name: 'BonusActivateErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.BONUS_ACTIVATE,
    errorCode: 3009
  },
  CancelSuccessErrorType: {
    name: 'CancelSuccessErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.CANCEL_SUCCESS,
    errorCode: 3010
  },
  UserInactiveErrorType: {
    name: 'UserInactiveErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.USER_INACTIVE,
    errorCode: 3011
  },
  WrongPasswordErrorType: {
    name: 'WrongPasswordErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.WRONG_PASSWORD,
    errorCode: 3012
  },
  EmailNotVerifiedErrorType: {
    name: 'EmailNotVerifiedErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.EMAIL_NOT_VERIFIED,
    errorCode: 3013
  },
  UsernameIsBadExistsErrorType: {
    name: 'UsernameIsBadExistsErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.USERNAME_NOT_ALLOWED,
    errorCode: 3014
  },
  UsernameOrEmailAlreadyExistsErrorType: {
    name: 'UsernameOrEmailAlreadyExistsErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.USERNAME_OR_EMAIL_ALREADY_EXISTS,
    errorCode: 3014
  },
  UserNotLoggedInErrorType: {
    name: 'UserNotLoggedInErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.USER_NOT_LOGGED_IN,
    errorCode: 3015
  },
  SessionExpiredErrorType: {
    name: 'SessionExpiredErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.SESSION_EXPIRED,
    errorCode: 3016
  },
  UsernameIsTakenErrorType: {
    name: 'UsernameIsTakenErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.USERNAME_IS_TAKEN,
    errorCode: 3017
  },
  PhoneIsTakenErrorType: {
    name: 'PhoneIsTakenErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.PHONE_IS_TAKEN,
    errorCode: 3018
  },
  LimitNotFoundErrorType: {
    name: 'LimitNotFoundErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.LIMIT_NOT_FOUND,
    errorCode: 3019
  },
  InvalidTimeUnitErrorType: {
    name: 'InvalidTimeUnitErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_TIME_UNIT,
    errorCode: 3020
  },
  InvalidValueErrorType: {
    name: 'InvalidValueErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_VALUE,
    errorCode: 3021
  },
  ExcludedPermanentlyPleaseContactProviderErrorType: {
    name: 'ExcludedPermanentlyPleaseContactProviderErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.EXCLUDED_PERMANENTLY_PLEASE_CONTACT_PROVIDER,
    errorCode: 3022
  },
  InvalidEventIdCombinationErrorType: {
    name: 'InvalidEventIdCombinationErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_EVENT_ID_COMBINATION,
    errorCode: 3023
  },
  InvalidWalletIdErrorType: {
    name: 'InvalidWalletIdErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_WALLET_ID,
    errorCode: 3024
  },
  NotEnoughAmountErrorType: {
    name: 'NotEnoughAmountErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.NOT_ENOUGH_AMOUNT,
    errorCode: 3025
  },
  AccessTokenNotFoundErrorType: {
    name: 'AccessTokenNotFoundErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.ACCESS_TOKEN_NOT_FOUND,
    errorCode: 3026
  },
  BettingIsDiabledErrorType: {
    name: 'BettingIsDiabledErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.BETTING_IS_DIABLED,
    errorCode: 3027
  },
  MinStakeRequiredErrorType: {
    name: 'MinStakeRequiredErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.MIN_STAKE_REQUIRED,
    errorCode: 3028
  },
  OddsShuldBeInRangeErrorType: {
    name: 'OddsShuldBeInRangeErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.ODDS_SHULD_BE_IN_RANGE,
    errorCode: 3029
  },
  InvalidSportIdErrorType: {
    name: 'InvalidSportIdErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_SPORT_ID,
    errorCode: 3030
  },
  YourCountryIsNotListedErrorType: {
    name: 'YourCountryIsNotListedErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.YOUR_COUNTRY_IS_NOT_LISTED,
    errorCode: 3031
  },
  InvalidBonusIdErrorType: {
    name: 'InvalidBonusIdErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_BONUS_ID,
    errorCode: 3032
  },
  ExcludedTemporarilyErrorType: {
    name: 'ExcludedTemporarilyErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.EXCLUDED_TEMPORARILY,
    errorCode: 3033
  },
  InvalidAddressIdErrorType: {
    name: 'InvalidAddressIdErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_ADDRESS_ID,
    errorCode: 3034
  },
  InvalidTokenErrorType: {
    name: 'InvalidTokenErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_TOKEN,
    errorCode: 3035
  },
  WrongTokenTypeErrorType: {
    name: 'WrongTokenTypeErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.WRONG_TOKEN_TYPE,
    errorCode: 3036
  },
  FileDoesNotExistsErrorType: {
    name: 'FileDoesNotExistsErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.FILE_DOES_NOT_EXISTS,
    errorCode: 3037
  },
  InvalidDocumentLabelIdErrorType: {
    name: 'InvalidDocumentLabelIdErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_DOCUMENT_LABEL_ID,
    errorCode: 3038
  },
  DocumentIsApprovedErrorType: {
    name: 'DocumentIsApprovedErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.DOCUMENT_IS_APPROVED,
    errorCode: 3039
  },
  InvalidDocumentIdErrorType: {
    name: 'InvalidDocumentIdErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_DOCUMENT_ID,
    errorCode: 3040
  },
  InvalidBonusErrorType: {
    name: 'InvalidBonusErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_BONUS,
    errorCode: 3041
  },
  BonusAlreadyActiveErrorType: {
    name: 'BonusAlreadyActiveErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.BONUS_ALREADY_ACTIVE,
    errorCode: 3042
  },
  CashoutNotAllowedErrorType: {
    name: 'CashoutNotAllowedErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.CASHOUT_NOT_ALLOWED,
    errorCode: 3043
  },
  FileFormatNotSupportedErrorType: {
    name: 'FileFormatNotSupportedErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.FILE_FORMAT_NOT_SUPPORTED,
    errorCode: 3044
  },
  DailyBetLimitExceededErrorType: {
    name: 'DailyBetLimitExceededErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.DAILY_ENTRY_LIMIT_EXCEEDED,
    errorCode: 3045
  },
  WeeklyBetLimitExceededErrorType: {
    name: 'WeeklyBetLimitExceededErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.WEEKLY_ENTRY_LIMIT_EXCEEDED,
    errorCode: 3046
  },
  MonthlyBetLimitExceededErrorType: {
    name: 'MonthlyBetLimitExceededErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.MONTHLY_ENTRY_LIMIT_EXCEEDED,
    errorCode: 3047
  },
  ServiceUnavailableErrorType: {
    name: 'ServiceUnavailableErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.SERVICE_UNAVAILABLE,
    errorCode: 3048
  },
  BlockedTransactionErrorType: {
    name: 'BlockedTransactionErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.BLOCKED_TRANSACTION,
    errorCode: 3049
  },
  AddressAlreadyExistsErrorType: {
    name: 'AddressAlreadyExistsErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.ADDRESS_ALREADY_EXISTS,
    errorCode: 3050
  },
  TournamentDoesNotExistErrorType: {
    name: 'TournamentDoesNotExistErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.TOURNAMENT_DOES_NOT_EXISTS,
    errorCode: 3049
  },
  TournamentNotActiveErrorType: {
    name: 'TournamentNotActiveErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.TOURNAMENT_NOT_ACTIVE,
    errorCode: 3050
  },
  RegistrationEndDateErrorType: {
    name: 'RegistrationEndDateErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.TOURNAMENT_REGISTRATION_CLOSE,
    errorCode: 3051
  },
  BalanceErrorType: {
    name: 'BalanceErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INSUFFICIENT_BALANCE,
    errorCode: 3053
  },
  TournamentsAlreadyEnrolledErrorType: {
    name: 'TournamentsAlreadyEnrolledErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.USER_ALREADY_ENROLLED_IN_TOURNAMENT,
    errorCode: 3054
  },
  TournamentPlayerLimitReachedErrorType: {
    name: 'TournamentPlayerLimitReachedErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.TOURNAMENT_PLAYER_LIMIT_REACHED,
    errorCode: 3055
  },
  NoRebuyLimitErrorType: {
    name: 'NoRebuyLimitErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.TOURNAMENT_REBUY_LIMIT_REACHED,
    errorCode: 3056
  },
  NotEnrolledInTournamentErrorType: {
    name: 'NotEnrolledInTournamentErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.USER_ALREADY_NOT_ENROLLED_IN_TOURNAMENT,
    errorCode: 3055
  },
  ActiveBonusExistErrorType: {
    name: 'ActiveBonusExistErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.ACTIVE_BONUS_EXISTS,
    errorCode: 3051
  },
  BonusCancelledExistErrorType: {
    name: 'BonusCancelledExistErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.BONUS_ALREADY_CANCELLED,
    errorCode: 3052
  },
  EmailAlreadyVerifiedErrorType: {
    name: 'EmailAlreadyVerifiedErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.EMAIL_ALREADY_VERIFIED,
    errorCode: 3052
  },
  EmailAlreadyExistError: {
    name: 'EmailAlreadyExistError',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.EMAIL_ALREADY_EXITS,
    errorCode: 3052
  },
  BonusTypeAlreadyAvailedErrorType: {
    name: 'BonusTypeAlreadyAvailedErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.BONUS_ALREADY_AVAILED,
    errorCode: 3052
  },
  InvalidAggregatorType: {
    name: 'InvalidAggregatorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.INVALID_AGGREGATOR_TYPE,
    errorCode: 3027
  },
  TransactionAlreadyExistsErrorType: {
    name: 'TransactionAlreadyExistsErrorType',
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    description: messages.TRANSACTION_ALREADY_EXISTS,
    errorCode: 3028
  },

  // ── reKYC: selfie step-up required ──────────────────────────────────────
  StepUpKycRequiredErrorType: {
    name: 'StepUpKycRequiredErrorType',
    statusCode: StatusCodes.FORBIDDEN,
    isOperational: true,
    description: 'Selfie step-up verification required to proceed.',
    errorCode: 4001
  }
}
