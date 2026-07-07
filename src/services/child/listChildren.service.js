import db from '../../db/models'
import serviceBase from '../../libs/serviceBase'
import ajv from '../../libs/ajv'

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'number' }
  },
  required: ['userId']
}

const constraints = ajv.compile(schema)

export default class ListChildren extends serviceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { userId } = this.args

    try {
      const children = await db.Child.findAll({
        where: { user_id: userId },
        order: [['created_at', 'ASC']]
      })

      return { message: 'Children fetched successfully!', status: 200, result: { children } }
    } catch (error) {
      console.error('List Children Error: ', error)
      return this.addError('InternalServerErrorType', error.message || 'Something went wrong.')
    }
  }
}
