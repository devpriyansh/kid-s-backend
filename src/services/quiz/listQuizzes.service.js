import db from '../../db/models'
import serviceBase from '../../libs/serviceBase'
import ajv from '../../libs/ajv'

const schema = {
  type: 'object',
  properties: {
    classLevel: { type: 'string', enum: ['nursery', 'kg1', 'kg2'] }
  },
  required: ['classLevel']
}

const constraints = ajv.compile(schema)

export default class ListQuizzes extends serviceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { classLevel } = this.args

    try {
      const quizzes = await db.Quiz.findAll({
        where: { class_level: classLevel },
        include: [
          {
            model: db.Question,
            as: 'questions'
          }
        ],
        order: [['id', 'ASC']]
      })

      return { message: 'Quizzes fetched successfully!', status: 200, result: { quizzes } }
    } catch (error) {
      console.error('List Quizzes Error: ', error)
      return this.addError('InternalServerErrorType', error.message || 'Something went wrong.')
    }
  }
}
