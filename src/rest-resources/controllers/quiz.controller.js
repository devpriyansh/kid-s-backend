import { sendResponse } from '../../helpers/response.helpers'
import ListQuizzes from '../../services/quiz/listQuizzes.service'
import SubmitResult from '../../services/quiz/submitResult.service'

export default class QuizController {
  static async list (req, res, next) {
    try {
      const { result, successful, errors } = await ListQuizzes.execute(
        { classLevel: req.params.classLevel },
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

  static async submit (req, res, next) {
    try {
      const { result, successful, errors } = await SubmitResult.execute(
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
}
