// import moment from "moment-timezone";
// import db from "../../db/models";

// /**
//  * Checks if the user is currently under a self-exclusion period.
//  * @param {number} userId - The ID of the user to check.
//  * @returns {boolean} True if the user is under self-exclusion, false otherwise.
//  */

// export const isUserSelfExcluded = async (userId) => {
//   try {
//     const setting = await db.ResponsibleGamingSettings.findOne({
//       where: { userId },
//       attributes: [
//         "selfExclusionTillValue",
//         "selfExclusionTillUnit",
//         "selfExclusionTillUpdatedAt",
//       ],
//     });

//     if (
//       !setting ||
//       !setting.selfExclusionTillValue ||
//       !setting.selfExclusionTillUnit ||
//       !setting.selfExclusionTillUpdatedAt
//     ) {
//       return false;
//     }

//     // Handle "Permanent" exclusion
//     if (setting.selfExclusionTillUnit.toLowerCase() === "permanent") {
//       return true; // Always excluded
//     }

//     // Normalize unit strings to something moment.js understands
//     let unit = setting.selfExclusionTillUnit.toLowerCase();

//     // Normalize singular/plural variations
//     if (unit === "month" || unit === "months") unit = "months";
//     else if (unit === "year" || unit === "years") unit = "years";
//     else if (unit === "day" || unit === "days") unit = "days";
//     else if (unit === "week" || unit === "weeks") unit = "weeks";
//     else {
//       // If unknown unit, default to days or throw
//       unit = "days";
//     }

//     const exclusionEnd = moment
//       .utc(setting.selfExclusionTillUpdatedAt)
//       .add(setting.selfExclusionTillValue, unit)
//       .tz("America/New_York");

//     const now = moment().tz("America/New_York");

//     return now.isBefore(exclusionEnd);
//   } catch (error) {
//     console.error(`Error checking self-exclusion for user ${userId}:`, error);
//     throw new Error("Failed to check self-exclusion status.");
//   }
// };

// ==================== New Helper Function ====================

import moment from 'moment-timezone'
import db from '../../db/models'

/**
 * NEW FUNCTION: Calculates the exact text state requested by the client.
 * You only need to call this in NEW code where you specifically need the string.
 * @returns {string} "SELF_EXCLUDED", "ACTIVE_RESTRICTED", or "ACTIVE"
 */
export const getAccountComplianceState = async (userId) => {
  try {
    const setting = await db.ResponsibleGamingSettings.findOne({
      where: { userId },
      attributes: [
        'timeoutEnabled',
        'timeoutValue',
        'timeoutUnit',
        'timeoutStartAt',
        'selfExclusionTillUnit'
      ]
    })

    if (!setting) return 'ACTIVE'

    // 1. Check Self-Exclusion (Regulatory Lockout)
    // Fix: If this unit has ANY value, they are locked out permanently until an admin clears it.
    if (setting.selfExclusionTillUnit) {
      return 'SELF_EXCLUDED'
    }

    // 2. Check Time Out / Cool-Off (Behavior Control)
    // Fix: Timeouts DO auto-expire. Check if current time is within the window.
    if (setting.timeoutEnabled && setting.timeoutStartAt && setting.timeoutValue && setting.timeoutUnit) {
      const tUnit = setting.timeoutUnit.toLowerCase()
      const timeoutEnd = moment
        .utc(setting.timeoutStartAt)
        .add(setting.timeoutValue, tUnit)
        .tz('America/New_York')

      const now = moment().tz('America/New_York')

      if (now.isBefore(timeoutEnd)) {
        return 'ACTIVE_RESTRICTED'
      }
    }

    return 'ACTIVE'
  } catch (error) {
    console.error(`Error checking compliance state for user ${userId}:`, error)
    return 'SELF_EXCLUDED' // Fail-safe to restricted if DB errors
  }
}

/**
 * UPDATED EXISTING FUNCTION: It still returns a pure Boolean (true/false).
 * Because the signature hasn't changed, NONE of your existing APIs will break!
 * They will just receive a more legally-accurate true/false.
 */
export const isUserSelfExcluded = async (userId) => {
  // We just ask the new function what the state is
  const state = await getAccountComplianceState(userId)

  // If the state is anything other than ACTIVE, they are locked out (returns true)
  return state !== 'ACTIVE'
}
