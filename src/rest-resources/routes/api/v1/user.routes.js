import express from 'express'
import UserController from '../../../controllers/user.controller'
import requestValidationMiddleware from '../../../middlewares/requestValidation.middleware'
import responseValidationMiddleware from '../../../middlewares/responseValidation.middleware'
import { isUserAuthenticated } from '../../../middlewares/isUserAuthenticated.middleware'

const userRoutes = express.Router()

const standardResponseSchema = {
  responseSchema: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'integer' },
        message: { type: 'string' },
        result: { type: 'object' }
      },
      required: ['status', 'message', 'result']
    },
    404: {
      type: 'object',
      properties: {
        status: { type: 'integer' },
        message: { type: 'string' }
      },
      required: ['status', 'message']
    },
    500: {
      type: 'object',
      properties: {
        status: { type: 'integer' },
        message: { type: 'string' },
        error: { type: 'string' }
      },
      required: ['status', 'message', 'error']
    }
  }
}

userRoutes.route('/register').post(
  UserController.register,
  responseValidationMiddleware(standardResponseSchema)
)

userRoutes.route('/login').post(
  UserController.login,
  responseValidationMiddleware(standardResponseSchema)
)

userRoutes.route('/logout').post(
  isUserAuthenticated,
  UserController.logout,
  responseValidationMiddleware(standardResponseSchema)
)

userRoutes.route('/reset-password').post(
  UserController.resetPassword,
  responseValidationMiddleware(standardResponseSchema)
)

userRoutes.route('/api-key').put(
  isUserAuthenticated,
  UserController.updateApiKey,
  responseValidationMiddleware(standardResponseSchema)
)

export default userRoutes
