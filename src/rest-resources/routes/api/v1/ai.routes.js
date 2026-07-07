import express from 'express'
import AIController from '../../../controllers/ai.controller'
import responseValidationMiddleware from '../../../middlewares/responseValidation.middleware'
import { isUserAuthenticated } from '../../../middlewares/isUserAuthenticated.middleware'

const aiRoutes = express.Router()

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

aiRoutes.route('/tutor').post(
  isUserAuthenticated,
  AIController.tutor,
  responseValidationMiddleware(standardResponseSchema)
)

export default aiRoutes
