import serviceBase from '../../libs/serviceBase'
import ajv from '../../libs/ajv'
import db from '../../db/models'

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'integer' },
    sessionId: { type: 'string' }
  },
  required: ['userId']
}

const constraints = ajv.compile(schema)

export default class logoutService extends serviceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { userId, sessionId } = this.args
    try {
      const user = await db.User.findOne({ where: { id: userId } })
      if (!user) {
        return this.addError('UserNotFoundErrorType', 'We couldn’t find an account with that info.')
      }

      /**
       * ---------------------------------------
       * DESTROY ACTIVE SESSION (ADDED)
       * ---------------------------------------
       */
      await db.UserSession.destroy({
        where: {
          id: sessionId,
          user_id: userId
        },
        transaction: this.context.sequelizeTransaction
      })

      await user.update({ deviceToken: '' })

      return {
        result: {},
        message: 'You’re logged out. See you soon! ',
        status: 200
      }
    } catch (error) {
      console.log(error)
      return this.addError(
        'InternalServerErrorType',
        'Something went wrong on our side. Please try again.'
      )
    }
  }
}
