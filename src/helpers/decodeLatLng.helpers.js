/**
 * Decode base64 encoded "latitude;longitude;stateName;country"
 * Example (decoded): "44.519754;-67.619761;New York;US"
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

const decodeLatLng = (latlng) => {
  if (!latlng || typeof latlng !== 'string') {
    throw new Error('LATLNG_MISSING')
  }

  // Decode base64
  const decoded = decodeBase64(latlng)
  // Expected: lat;lng;stateName;country
  const parts = decoded.split(';')

  if (parts.length < 2) {
    throw new Error('LATLNG_INVALID_FORMAT')
  }

  const latitude = Number(parts[0])
  const longitude = Number(parts[1])

  const stateName = parts[2]
    ? String(parts[2]).trim()
    : null

  const countryCode = parts[3]
    ? String(parts[3]).trim().toUpperCase()
    : null

  if (!isFiniteNumber(latitude) || !isFiniteNumber(longitude)) {
    throw new Error('LATLNG_INVALID_VALUES')
  }

  validateRange(latitude, longitude)

  // Optional but recommended validation
  if (countryCode && !/^[A-Z]{2}$/.test(countryCode)) {
    throw new Error('COUNTRY_CODE_INVALID')
  }

  if (stateName && stateName.length < 2) {
    throw new Error('STATE_NAME_INVALID')
  }

  return {
    latitude,
    longitude,
    stateName, // e.g. "New York"
    countryCode // e.g. "US"
  }
}

export { decodeLatLng }
