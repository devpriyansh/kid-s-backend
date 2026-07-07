import Flatted from 'flatted'
import _ from 'lodash'
import ajv from '../../libs/ajv'
import { InternalServerErrorType, SocketResponseValidationErrorType } from '../../libs/errorTypes'

/**
 *
 *
 * @export
 * @param {import('./contextSocket').SocketContext} context
 * @param {string} event
 * @param {function} callback
 * @param {Object} payload
 * It will first validate the data if schema is present
 * If there is any error while validating the schemas it will log error and return InternalServerError
 * Also it will always send response in { data: {}, errors: [] } form
 * It will call the callback with payload if callback is present otherwise complete the call
 */
export default function responseValidationSocketMiddleware (context, event, callback, payload) {
  if (!callback) {
    return
  }

  payload = { data: null, errors: [], ...payload }

  payload = Flatted.parse(Flatted.stringify(payload))

  if (payload?.errors?.length) {
    callback(payload)
    return
  }

  const compiledResponseSchema = context?.schemas?.response

  if (compiledResponseSchema) {
    if (compiledResponseSchema(payload.data)) {
      callback(payload)
    } else {
      const errors = ajv.errorsText(compiledResponseSchema.errors)

      context?.logger.error(SocketResponseValidationErrorType.name + ` In namespace ${context?.socket?.nsp.name} event name ${event}`, {
        message: SocketResponseValidationErrorType.description,
        fault: errors
      })
      const response = { data: {}, errors: [_.pick(InternalServerErrorType, ['name', 'description', 'errorCode'])] }
      callback(response)
    }
  } else {
    callback(payload)
  }
}
