import _ from 'lodash'
import SocketRequestInputValidationError from '../../errors/socketRequestInputValidation.error'
import ajv from '../../libs/ajv'

/**
 *
 *
 * @export
 * @param {[string, import('./contextSocket.middleware').SocketRequestData, function]} args
 * @param {function} next
 * If schema is there it will get the schema and validate the if data is not valid it will pass the error
 * to the client if resCallback is available and pass the error to the next middleware
 */
export default function requestValidationSocketMiddleware (args, next) {
  const [eventName, requestData, resCallback] = args

  const { payload, context } = requestData

  const compiledPayloadSchema = context?.schemas?.request

  const errorPayload = {}
  let error = false

  if (!compiledPayloadSchema) {
    next()
    return
  }

  if (!compiledPayloadSchema(payload)) {
    error = true
    errorPayload.payload = ajv.errorsText(compiledPayloadSchema.errors)
  }

  if (!error) {
    next()
    return
  }

  const validationError = new SocketRequestInputValidationError(errorPayload)

  context?.logger.error('SocketRequestInputValidationError' + ` In namespace ${context?.socket?.nsp.name} event name ${eventName}`, {
    message: validationError.message,
    fault: {
      payload
    }
  })

  resCallback({
    errors: [_.pick(validationError, ['name', 'description', 'errorCode', 'fields'])],
    data: {}
  })

  next(validationError)
}
