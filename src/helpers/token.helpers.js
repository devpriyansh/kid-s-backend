import crypto from 'crypto'
import db from '../db/models'

/**
 * Generates a secure reset token.
 * @param {string} identifier - The email or phone number of the user.
 * @param {string} type - The type of identifier ('email' or 'phoneNumber').
 * @returns {string} The generated reset token.
 */
export const generateResetToken = async (identifier, type) => {
  try {
    // Generate a random token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expires = new Date()
    expires.setHours(expires.getHours() + 1)

    // Prepare the update condition based on type
    const whereClause = type === 'email' ? { email: identifier } : { phone: identifier }

    // Store the reset token in the users table
    const updateResult = await db.User.update(
      { resetToken, resetTokenExpires: expires },
      { where: whereClause }
    )

    if (updateResult[0] === 0) {
      throw new Error('User not found or unable to update reset token.')
    }

    return resetToken
  } catch (error) {
    console.error('Error generating or storing reset token:', error)
    throw new Error('Failed to generate reset token.')
  }
}

/**
 * Generates a secure OTP without storing it in the database.
 * @returns {string} The generated OTP.
 */
export const generateOTP = () => {
  // return '654321'; // temporary static to make it work for US AND CAN number till we receive response from provider
  return crypto.randomInt(100000, 999999).toString()
}
