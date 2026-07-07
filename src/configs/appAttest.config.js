let APP_ATTEST_CONFIG = null

const BUNDLE_ID = process.env.APP_ATTEST_BUNDLE_ID ?? 'com.eazy6'
const TEAM_ID = process.env.APP_ATTEST_TEAM_ID ?? '5WZK42F73L'

if (!BUNDLE_ID || !TEAM_ID) {
  console.warn(' App Attest ENV missing — running in SAFE MODE')

  APP_ATTEST_CONFIG = {
    enabled: false,
    configuration: {
      bundleIdentifier: null,
      teamIdentifier: null,
      allowDevelopmentEnvironment: true,
      logger: { info () {}, warn () {}, error () {} }
    }
  }
} else {
  APP_ATTEST_CONFIG = {
    enabled: true,
    configuration: {
      bundleIdentifier: BUNDLE_ID,
      teamIdentifier: TEAM_ID,
      allowDevelopmentEnvironment: process.env.NODE_ENV !== 'production',
      logger: console
    }
  }
}

module.exports = { APP_ATTEST_CONFIG }
