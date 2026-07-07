import express from 'express'
import ChildController from '../../../controllers/child.controller'
import responseValidationMiddleware from '../../../middlewares/responseValidation.middleware'
import { isUserAuthenticated } from '../../../middlewares/isUserAuthenticated.middleware'

const childRoutes = express.Router()

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

childRoutes.route('/add').post(
  isUserAuthenticated,
  ChildController.add,
  responseValidationMiddleware(standardResponseSchema)
)

childRoutes.route('/list').get(
  isUserAuthenticated,
  ChildController.list,
  responseValidationMiddleware(standardResponseSchema)
)

export default childRoutes
