import express from 'express'
import ParentController from '../../../controllers/parent.controller'
import responseValidationMiddleware from '../../../middlewares/responseValidation.middleware'
import { isUserAuthenticated } from '../../../middlewares/isUserAuthenticated.middleware'

const parentRoutes = express.Router()

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
    }
  }
}

parentRoutes.route('/dashboard').get(
  isUserAuthenticated,
  ParentController.getDashboard,
  responseValidationMiddleware(standardResponseSchema)
)

export default parentRoutes
