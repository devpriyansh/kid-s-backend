import db from '../../db/models'
import serviceBase from '../../libs/serviceBase'
import ajv from '../../libs/ajv'
import { createNewEntity } from '../../helpers/crud'

const schema = {
  type: 'object',
  properties: {
    childId: { type: 'number' },
    quizId: { type: 'number' },
    score: { type: 'number' },
    starsEarned: { type: 'number' },
    coinsEarned: { type: 'number' }
  },
  required: ['childId', 'quizId', 'score']
}

const constraints = ajv.compile(schema)

export default class SubmitResult extends serviceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { childId, quizId, score, starsEarned = 0, coinsEarned = 0 } = this.args
    const t = this.context.sequelizeTransaction

    try {
      // Create activity result
      const resultData = await createNewEntity({
        model: db.ActivityResult,
        data: {
          child_id: childId,
          quiz_id: quizId,
          score,
          stars_earned: starsEarned,
          coins_earned: coinsEarned
        },
        transaction: t
      })

      // Update child totals
      const child = await db.Child.findByPk(childId, { transaction: t })
      if (child) {
        await child.update({
          total_stars: child.total_stars + starsEarned,
          total_coins: child.total_coins + coinsEarned
        }, { transaction: t })
      }

      return { message: 'Result submitted successfully!', status: 200, result: { resultData } }
    } catch (error) {
      console.error('Submit Result Error: ', error)
      return this.addError('InternalServerErrorType', error.message || 'Something went wrong.')
    }
  }
}
