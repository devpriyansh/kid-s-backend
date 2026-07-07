import db, { sequelize } from '../../db/models'
import serviceBase from '../../libs/serviceBase'
import bcrypt from 'bcrypt'
import ajv from '../../libs/ajv'
import crypto from 'crypto'
import moment from 'moment-timezone'
import { encryptPassword, comparePassword } from '../../utils/common.util'
import { getOne, updateEntity } from '../../helpers/crud'
import { passwordChangeEmail } from '../../helpers/emails/passwordChangeEmail.helpers'
import { Op } from 'sequelize'

// Define schema for validation
const schema = {
  type: 'object',
  properties: {
    resetToken: { type: 'string' },
    newPassword: { type: 'string', minLength: 6 },
    confirmNewPassword: { type: 'string', minLength: 6 }
  },
  required: ['resetToken', 'newPassword', 'confirmNewPassword']
}

const constraints = ajv.compile(schema)

export default class ResetPassword extends serviceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { resetToken, newPassword, confirmNewPassword } = this.args

    try {
      const decodedNew = Buffer.from(newPassword, 'base64').toString('utf-8')
      const decodedConfirm = Buffer.from(confirmNewPassword, 'base64').toString('utf-8')

      // -----------------------------
      //  Validate new password match
      // -----------------------------
      if (decodedNew !== decodedConfirm) {
        return this.addError(
          'PasswordMismatchErrorType',
          'Passwords don’t match.'
        )
      }

      const hashedIncomingToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
      console.log('hashedIncomingToken', hashedIncomingToken)
      const user = await getOne({
        model: db.User,
        data: {
          resetToken: hashedIncomingToken,
          resetTokenExpires: {
            [Op.gt]: moment.utc().toDate()
          }
        },
        attributes: ['id', 'email']
      })

      if (!user) {
        return this.addError('UserNotFoundErrorType', 'We couldn’t find an account with that info.')
      }

      // Encrypt the new password
      // let decodedPassword = Buffer.from(newPassword, 'base64').toString('utf-8');
      const hashedPassword = await encryptPassword(newPassword)

      // Update the user's password
      await updateEntity({
        model: db.User,
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpires: null
        },
        values: { id: user.id }
      })

      // Send password change confirmation email
      if (user.email) {
        await passwordChangeEmail(user.email)
      }

      return {
        message: 'Password has been changed successfully.',
        status: 200
      }
    } catch (error) {
      return this.addError(
        'InternalServerErrorType',
        'Something went wrong on our side. Please try again.'
      )
    }
  }
}
