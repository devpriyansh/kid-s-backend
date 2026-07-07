import config from '../configs/app.config'

const ENV_SUFFIX_MAP = {
  development: 'DEV',
  staging: 'STG',
  test: 'DEV',
  production: 'PROD'
}

/**
 * Builds the SumSub external ID with an environment suffix
 * to avoid ID collisions across environments.
 */
export function buildExternalId (userId) {
  const env = config.get('env')
  const suffix = ENV_SUFFIX_MAP[env]
  return suffix ? `${userId}-${suffix}` : `${userId}`
}
