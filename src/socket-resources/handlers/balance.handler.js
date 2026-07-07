import BalanceEmitter from '../emitters/balance.emitter'

class BalanceHandler {
  /**
   * Handles balance updates and emits them to the specific user
   * @param {object} data - The received balance update data
   * @param {string} data.userId - The user ID
   * @param {number} data.balance - The updated balance
   * @param {import('socket.io').Server} socket - The socket instance
   */
  static updateBalance (data, socket) {
    // const { userId, balance } = data;
    // console.log(`🔄 Received balance update for user ${userId}: ${balance}`);
    // BalanceEmitter.emitBalanceUpdate(socket.server, userId, balance);
    console.log('Data received in handler:', data)
  }
}

export default BalanceHandler
