import express from 'express'
import QuizController from '../../../controllers/quiz.controller'
import responseValidationMiddleware from '../../../middlewares/responseValidation.middleware'
import { isUserAuthenticated } from '../../../middlewares/isUserAuthenticated.middleware'

const quizRoutes = express.Router()

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

quizRoutes.route('/list/:classLevel').get(
  isUserAuthenticated,
  QuizController.list,
  responseValidationMiddleware(standardResponseSchema)
)

quizRoutes.route('/submit').post(
  isUserAuthenticated,
  QuizController.submit,
  responseValidationMiddleware(standardResponseSchema)
)

export default quizRoutes
