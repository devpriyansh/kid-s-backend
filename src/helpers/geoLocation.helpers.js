import db from '../db/models'
import { getOne } from '../helpers/crud'
import { isPointInsideState } from './geoPolygon.helpers'

/**
 * ----------------------------------------
 * Internal helpers
 * ----------------------------------------
 */

const isFiniteNumber = (v) =>
  typeof v === 'number' && Number.isFinite(v)

const decodeBase64 = (value) => {
  try {
    return Buffer.from(value, 'base64').toString('utf8')
  } catch {
    throw new Error('LATLNG_BASE64_DECODE_FAILED')
  }
}

const validateRange = (lat, lng) => {
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    throw new Error('LATLNG_OUT_OF_RANGE')
  }
}

/**
 * Parse config values safely
 * Supports:
 *  - JSON array: ["US","IN"]
 *  - CSV string: US,IN,PH
 */
const parseConfigList = (value) => {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.map(v => String(v).trim().toUpperCase()).filter(Boolean)
  }

  if (typeof value !== 'string') return []

  const trimmed = value.trim()

  if (trimmed.startsWith('[')) {
    return JSON.parse(trimmed).map(v => String(v).trim().toUpperCase())
  }

  // CSV string
  return trimmed
    .split(',')
    .map(v => v.trim().toUpperCase())
    .filter(Boolean)
}

/**
 * ----------------------------------------
 * Decode base64 encoded location
 * Format (decoded):
 * "latitude;longitude;stateName;country"
 * Example:
 * "44.519754;-67.619761;New York;US"
 * ----------------------------------------
 */
const decodeLatLng = (latlng) => {
  if (!latlng || typeof latlng !== 'string') {
    throw new Error('LATLNG_MISSING')
  }

  const decoded = decodeBase64(latlng)
  const parts = decoded.split(';')

  if (parts.length < 2) {
    throw new Error('LATLNG_INVALID_FORMAT')
  }

  const latitude = Number(parts[0])
  const longitude = Number(parts[1])

  const rawState = parts[2]?.trim()
  const rawCountry = parts[3]?.trim()

  const stateName =
    rawState && !['undefined', 'null', ''].includes(rawState.toLowerCase())
      ? rawState
      : null

  const countryCode =
    rawCountry && !['undefined', 'null', ''].includes(rawCountry.toLowerCase())
      ? rawCountry.toUpperCase()
      : null

  if (!isFiniteNumber(latitude) || !isFiniteNumber(longitude)) {
    throw new Error('LATLNG_INVALID_VALUES')
  }

  validateRange(latitude, longitude)

  return {
    latitude,
    longitude,
    stateName, // e.g. "New York"
    countryCode // e.g. "US"
  }
}

/**
 * ----------------------------------------
 * Validate location against allow-list
 *
 * Rules:
 * - If country !== US → allowed_countries only
 * - If country === US → allowed_states required
 * ----------------------------------------
 */
const isLocationAllowed = async ({ countryCode, stateName, latitude, longitude }) => {
  try {
    if (!countryCode) {
      return {
        allowed: false,
        success: false,
        message: 'Country code is required.',
        reasonCode: 'COUNTRY_MISSING'
      }
    }

    const normalizedCountry = countryCode.toUpperCase()

    const [countriesCfg, statesCfg] = await Promise.all([
      getOne({
        model: db.GlobalConfiguration,
        data: { configKey: 'allowed_countries' }
      }),
      getOne({
        model: db.GlobalConfiguration,
        data: { configKey: 'allowed_states' }
      })
    ])

    if (!countriesCfg?.configValue) {
      return {
        allowed: false,
        success: false,
        message: 'Allowed countries configuration missing.',
        reasonCode: 'CONFIG_COUNTRIES_MISSING'
      }
    }

    const allowedCountries = parseConfigList(countriesCfg.configValue)

    if (!allowedCountries.includes(normalizedCountry)) {
      return {
        allowed: false,
        success: true,
        message: 'Country is not allowed.',
        reasonCode: 'COUNTRY_NOT_ALLOWED'
      }
    }

    // Non-US → country only
    if (normalizedCountry !== 'US') {
      return {
        allowed: true,
        success: true,
        message: 'Country allowed.'
      }
    }

    // US → state required
    if (!stateName) {
      return {
        allowed: false,
        success: true,
        message: 'State is required for US.',
        reasonCode: 'STATE_REQUIRED'
      }
    }

    if (!statesCfg?.configValue) {
      return {
        allowed: false,
        success: false,
        message: 'Allowed states configuration missing.',
        reasonCode: 'CONFIG_STATES_MISSING'
      }
    }

    const allowedStates = parseConfigList(statesCfg.configValue)

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return {
        allowed: false,
        success: false,
        message: 'Invalid latitude or longitude.',
        reasonCode: 'LATLNG_INVALID'
      }
    }
    console.log('latitude, longitude, stateName', latitude, longitude, stateName)
    const geoCheck = await isPointInsideState({ latitude, longitude, stateName })

    if (!geoCheck.success || !geoCheck.inside) {
      return {
        allowed: false,
        success: true,
        message: geoCheck.message,
        reasonCode: 'STATE_GEOFENCE_FAILED'
      }
    }

    // console.log('allowedStates, geoCheck.stateCode', allowedStates, geoCheck.stateCode);
    if (!allowedStates.includes(geoCheck.stateCode)) {
      return {
        allowed: false,
        success: true,
        message: 'State is not allowed.',
        reasonCode: 'STATE_NOT_ALLOWED'
      }
    }

    return {
      allowed: true,
      success: true,
      message: 'State and location are allowed.'
    }
  } catch (error) {
    console.error('Location allow-list validation failed:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    })

    return {
      allowed: false,
      success: false,
      message: 'Failed to validate location.',
      error
    }
  }
}

/**
 * ----------------------------------------
 * SINGLE ENTRY POINT
 * ----------------------------------------
 */
const validateEncodedLocation = async (latlng) => {
  try {
    const decoded = await decodeLatLng(latlng)

    const allowCheck = await isLocationAllowed({
      countryCode: decoded.countryCode,
      stateName: decoded.stateName,
      latitude: decoded.latitude,
      longitude: decoded.longitude
    })

    return {
      success: allowCheck.success && allowCheck.allowed,
      allowed: allowCheck.allowed,
      message: allowCheck.message,
      reasonCode: allowCheck.reasonCode,
      location: decoded
    }
  } catch (error) {
    return {
      success: false,
      allowed: false,
      message: error.message,
      error
    }
  }
}

export {
  decodeLatLng,
  isLocationAllowed,
  validateEncodedLocation
}
