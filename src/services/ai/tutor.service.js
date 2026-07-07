import db from '../../db/models'
import fetch from 'node-fetch'
import serviceBase from '../../libs/serviceBase'

export default class AITutorService extends serviceBase {
  async run () {
    const { userId, systemPrompt, messages, transcript } = this.args

    if (!userId) {
      return this.addError('ValidationErrorType', 'User ID is required')
    }

    try {
      const user = await db.User.findByPk(userId)
      if (!user) {
        return this.addError('NotFoundErrorType', 'User not found')
      }

      const apiKey = user.geminiApiKey
      if (!apiKey) {
        return this.addError('MissingKeyErrorType', 'API_KEY_MISSING')
      }

      // Convert messages to Gemini format
      const geminiMessages = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))

      geminiMessages.push({
        role: 'user',
        parts: [{ text: transcript }]
      })

      // Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          system_instruction: {
            parts: { text: systemPrompt }
          },
          contents: geminiMessages
        })
      })

      if (!response.ok) {
        const errData = await response.json()
        const apiError = errData.error?.message || 'Gemini API request failed'
        return this.addError('GeminiApiErrorType', `GEMINI_API_ERROR: ${apiError}`)
      }

      const data = await response.json()
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!aiText) {
        return this.addError('GeminiApiErrorType', 'GEMINI_API_ERROR: No response from AI')
      }

      return {
        message: 'Tutor responded successfully',
        status: 200,
        result: {
          reply: aiText
        }
      }
    } catch (error) {
      console.error('AITutorService Error:', error)
      return this.addError('InternalServerErrorType', 'Internal server error while calling AI')
    }
  }
}
