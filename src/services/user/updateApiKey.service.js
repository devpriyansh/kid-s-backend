import db from '../../db/models'
import serviceBase from '../../libs/serviceBase'

export default class UpdateApiKey extends serviceBase {
  async run () {
    const { userId, apiKey } = this.args

    if (!userId) {
      return this.addError('ValidationErrorType', 'User ID is required')
    }

    try {
      const user = await db.User.findByPk(userId)
      if (!user) {
        return this.addError('NotFoundErrorType', 'User not found')
      }

      user.geminiApiKey = apiKey || null
      await user.save()

      return {
        message: 'API Key updated successfully',
        status: 200,
        result: {}
      }
    } catch (error) {
      console.error('UpdateApiKey Error:', error)
      return this.addError('InternalServerErrorType', 'Failed to update API key')
    }
  }
}
