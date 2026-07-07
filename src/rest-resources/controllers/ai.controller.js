import { sendResponse } from '../../helpers/response.helpers'
import AITutorService from '../../services/ai/tutor.service'

export default class AIController {
  static async tutor (req, res, next) {
    try {
      const { result, successful, errors } = await AITutorService.execute(
        {
          userId: req.userId,
          systemPrompt: req.body.systemPrompt,
          messages: req.body.messages,
          transcript: req.body.transcript
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
}
