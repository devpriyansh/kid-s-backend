import { sendResponse } from '../../helpers/response.helpers'
import GetDashboard from '../../services/parent/getDashboard.service'

export default class ParentController {
  static async getDashboard (req, res, next) {
    try {
      const { result, successful, errors } = await GetDashboard.execute(
        { userId: req.userId },
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
