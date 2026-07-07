import Flatted from 'flatted'
import ajv from '../../libs/ajv'
import Logger from '../../libs/logger'
import socketEmitter from '../../libs/socketEmitter'
import { SOCKET_EMITTERS, SOCKET_NAMESPACES, WALLET_SYSTEM } from '../../libs/constants'

// Define the schema for balance update emissions
const balanceUpdateSchema = {
  type: 'object',
  properties: {
    userId: { type: 'string' },
    balance: { type: 'number' }
  },
  required: ['userId', 'balance'],
  additionalProperties: false
}

// Register schema with AJV (avoids duplicate registration errors)
if (!ajv.getSchema('emitBalanceUpdate')) {
  ajv.addSchema(balanceUpdateSchema, 'emitBalanceUpdate')
}

/**
 * BalanceEmitter for emitting real-time balance updates
 */
export default class BalanceEmitter {
  /**
   * Emits updated balance to a specific user
   * @param {object} payload - The payload containing userId and balance
   */
  static async emitBalanceUpdate (payload) {
    try {
      if (!payload?.userId || payload.balance === undefined) {
        throw new Error('Invalid payload: userId and balance are required')
      }

      console.log(payload, 'payload------------------payload-------------')

      // Deep clone & validate data
      const parsedPayload = Flatted.parse(Flatted.stringify(payload))
      console.log(SOCKET_EMITTERS.UPDATE_BALANCE)

      // Emit event to the specific user's room
      socketEmitter
        .of(SOCKET_NAMESPACES.UPDATE_BALANCE)
        .to(parsedPayload.userId)
        .emit(SOCKET_EMITTERS.UPDATE_BALANCE, { data: parsedPayload })

      Logger.info('📢 Balance Update Emitted', {
        message: `✅ Balance updated for User ${parsedPayload.userId}: ${parsedPayload.balance}`
      })
    } catch (error) {
      Logger.error('❌ Error In Emitter', {
        message: 'Failed to emit balance update',
        exception: error.message || error
      })
    }
  }
}
