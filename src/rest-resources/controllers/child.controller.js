import { sendResponse } from '../../helpers/response.helpers'
import AddChild from '../../services/child/addChild.service'
import ListChildren from '../../services/child/listChildren.service'

export default class ChildController {
  static async add (req, res, next) {
    try {
      const { result, successful, errors } = await AddChild.execute(
        { ...req.body, userId: req.userId }, // userId from isUserAuthenticated middleware
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

  static async list (req, res, next) {
    try {
      const { result, successful, errors } = await ListChildren.execute(
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
