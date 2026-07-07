import _ from 'lodash'
import InvalidSocketArgumentError from '../../errors/InvalidSocketArgument.error'

/**
 *
 *
 * @export
 * @param {Array} args
 * @param {function} next
 * It will make sure that whenever we receive data it will be in proper format
 * like eventName, [payload] and [callback]
 * If the args is not in proper order then it will raise error, it will always expect the event to be on first place
 * and no more than 3 arguments
 */
export default function argumentsDecoratorSocketMiddleware (args, next) {
  if (args.length > 3 || (args[2] && typeof args[2] !== 'function')) {
    const invalidPayloadError = new InvalidSocketArgumentError({
      payload: args
    })

    if (typeof args[args.length - 1] === 'function') {
      args[args.length - 1]({ data: {}, errors: [_.pick(invalidPayloadError, ['name', 'description', 'errorCode', 'fields'])] })
    }

    next(invalidPayloadError)
    return
  }

  if (typeof args[1] === 'function') {
    args[2] = args[1]
    args[1] = {}
  }

  next()
}
