import { sendResponse } from '../../helpers/response.helpers'
import UserRegister from '../../services/user/userRegister.service'
import UserLogin from '../../services/user/userLogin.service'
import Logout from '../../services/user/logout.service'
import ResetPassword from '../../services/user/resetPassword.service'
import UpdateApiKey from '../../services/user/updateApiKey.service'

export default class UserController {
  static async register (req, res, next) {
    console.log('HIT UserController.register!')
    try {
      const { result, successful, errors } = await UserRegister.execute(
        req.body,
        req.context
      )
      sendResponse(
        { req, res, next },
        { result, successful, serviceErrors: errors }
      )
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      const castleHeaderToken = req.headers['x-castle-request-token'] || req.body.castleRequestToken || null
      const deviceToken = req.headers.devicetoken || req.body.deviceToken || null
      const castleDeviceId = req.headers.castledeviceid || req.body.castleDeviceId || null
      const { result, successful, errors } = await UserLogin.execute(
        {
          ...req.body,
          castleRequestToken: castleHeaderToken,
          deviceToken,
          castleDeviceId,
          ip: req.ip
        },
        req.context
      )
      sendResponse(
        { req, res, next },
        { result, successful, serviceErrors: errors }
      )
    } catch (error) {
      next(error)
    }
  }

  static async logout (req, res, next) {
    try {
      const { result, successful, errors } = await Logout.execute(
        {
          userId: req.userId,
          sessionId: req.sessionId
        },
        req.context
      )
      sendResponse(
        { req, res, next },
        { result, successful, serviceErrors: errors }
      )
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword (req, res, next) {
    try {
      const { result, successful, errors } = await ResetPassword.execute(
        req.body,
        req.context
      )
      sendResponse(
        { req, res, next },
        { result, successful, serviceErrors: errors }
      )
    } catch (error) {
      next(error)
    }
  }

  static async updateApiKey (req, res, next) {
    try {
      const { result, successful, errors } = await UpdateApiKey.execute(
        { userId: req.userId, apiKey: req.body.apiKey },
        req.context
      )
      sendResponse(
        { req, res, next },
        { result, successful, serviceErrors: errors }
      )
    } catch (error) {
      next(error)
    }
  }
}
