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

export default class GetDashboard extends serviceBase {
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

      const childIds = children.map(c => c.id)

      const recentActivities = await db.ActivityResult.findAll({
        where: { child_id: childIds },
        include: [
          { model: db.Quiz, as: 'quiz' },
          { model: db.Child, as: 'child' }
        ],
        order: [['created_at', 'DESC']],
        limit: 10
      })

      return {
        message: 'Dashboard fetched successfully!',
        status: 200,
        result: {
          children: children.map(c => c.toJSON()),
          recentActivities: recentActivities.map(a => a.toJSON())
        }
      }
    } catch (error) {
      console.error('Get Dashboard Error: ', error)
      return this.addError('InternalServerErrorType', error.message || 'Something went wrong.')
    }
  }
}
