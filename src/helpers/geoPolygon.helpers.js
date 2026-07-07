import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { point } from '@turf/helpers'
import db from '../db/models'
import { Op } from 'sequelize'

/**
 * Check whether a lat/lng lies inside a US state polygon
 * Supports lookup by:
 *  - state name (e.g. "New York")
 *
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} stateName - name
 *
 * @returns {{
 *   inside: boolean,
 *   success: boolean,
 *   message: string,
 *   stateCode?: string,
 *   stateName?: string
 * }}
 */
const isPointInsideState = async ({
  latitude,
  longitude,
  stateName
}) => {
  try {
    /**
     * -------------------------
     * Input validation
     * -------------------------
     */
    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return {
        inside: false,
        success: false,
        message: 'Invalid latitude or longitude.'
      }
    }

    if (!stateName) {
      return {
        inside: false,
        success: false,
        message: 'state Name is required.'
      }
    }

    /**
     * -------------------------
     * Fetch state polygon
     * Match by:
     *  - state_code (FIPS)
     *  - name (case-insensitive)
     * -------------------------
     */
    const stateRow = await db.UsStatesMap.findOne({
      where: {
        name: {
          [Op.iLike]: stateName
        }
      },
      attributes: ['geojson', 'stateCodeEn', 'name']
    })

    if (!stateRow || !stateRow.geojson) {
      return {
        inside: false,
        success: false,
        message: 'State polygon not found.',
        state: stateName
      }
    }

    /**
     * -------------------------
     * Turf point-in-polygon
     * IMPORTANT: [lng, lat]
     * -------------------------
     */
    const pt = point([longitude, latitude])
    const inside = booleanPointInPolygon(pt, stateRow.geojson)

    return {
      inside,
      success: true,
      message: inside
        ? 'Point lies inside the state boundary.'
        : 'Point lies outside the state boundary.',
      stateCode: stateRow.stateCodeEn,
      stateName: stateRow.name
    }
  } catch (error) {
    console.error('State polygon validation failed:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    })

    return {
      inside: false,
      success: false,
      message: 'Failed to validate state boundary.',
      error
    }
  }
}

export { isPointInsideState }
