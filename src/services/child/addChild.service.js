import db from '../../db/models'
import serviceBase from '../../libs/serviceBase'
import ajv from '../../libs/ajv'
import { createNewEntity } from '../../helpers/crud'

const schema = {
  type: 'object',
  properties: {
    userId: { type: 'number' },
    name: { type: 'string' },
    ageGroup: { type: 'string', enum: ['nursery', 'kg1', 'kg2'] },
    avatar: { type: 'string' }
  },
  required: ['userId', 'name', 'ageGroup']
}

const constraints = ajv.compile(schema)

export default class AddChild extends serviceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { userId, name, ageGroup, avatar } = this.args
    const t = this.context.sequelizeTransaction

    try {
      const newChild = await createNewEntity({
        model: db.Child,
        data: {
          user_id: userId,
          name,
          age_group: ageGroup,
          avatar: avatar || '🦁' // default avatar
        },
        transaction: t
      })

      return { message: 'Child added successfully!', status: 200, result: { child: newChild } }
    } catch (error) {
      console.error('Add Child Error: ', error)
      return this.addError('InternalServerErrorType', error.message || 'Something went wrong.')
    }
  }
}
