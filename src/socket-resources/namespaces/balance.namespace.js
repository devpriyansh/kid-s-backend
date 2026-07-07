import { socketSchemaBuilder } from '../../helpers/ajv.helpers'
import {
  SOCKET_LISTENERS,
  SOCKET_NAMESPACES,
  SOCKET_EMITTERS,
  SOCKET_ROOMS
} from '../../libs/constants'
import contextSocketMiddleware from '../middlewares/contextSocket.middleware'
import requestValidationSocketMiddleware from '../middlewares/requestValidationSocket.middleware'
import BalanceHandler from '../handlers/balance.handler'
import db from '../../db/models'

const socketSchemas = {
  [SOCKET_LISTENERS.UPDATE_BALANCE]: {
    request: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        balance: { type: 'number' }
      },
      required: ['userId', 'balance'],
      additionalProperties: false
    },
    response: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        balance: { type: 'number' }
      },
      required: ['userId', 'balance'],
      additionalProperties: false
    }
  }
}

/**
 * Socket namespace for balance updates
 * @param {import('socket.io').Server} io
 */
export default function (io) {
  const namespace = io.of('/')

  const compiledSchemas = socketSchemas
    ? socketSchemaBuilder(socketSchemas)
    : {}

  namespace.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`)

    socket.use(contextSocketMiddleware(socket, compiledSchemas))
    socket.use(requestValidationSocketMiddleware)

    socket.on(SOCKET_ROOMS.ROOM_JOINED, async (val) => {
      try {
        const userId = val?.payload?.userId
        if (!userId) return

        const room = String(userId)
        socket.data.userId = room
        socket.join(room)

        console.log('This socket belongs to user:', socket.data.userId)
        console.log(
          `📌 User ${userId} joined room ${room}`,
          SOCKET_EMITTERS.ROOM_JOINED
        )
        socket.emit(SOCKET_EMITTERS.ROOM_JOINED, {
          userId,
          message: 'joined room successfully'
        })
        await emitUserBalance(userId, socket)
      } catch (err) {
        console.error('Error in ROOM_JOINED handler:', err)
      }
    })

    async function emitUserBalance (userId, socket) {
      const user = await db.User.findOne({
        where: { id: userId },
        attributes: ['amount', 'bonusAmount', 'giftCardAmount', 'points', 'redeemablePoints']
      })
      if (!user) return

      socket.emit(SOCKET_EMITTERS.GET_BALANCE, {
        userId,
        balance: user.amount || 0.0,
        bonusBalance: user.bonusAmount || 0.0,
        giftCardAmount: user.giftCardAmount || 0.0,
        points: user.points || 0,
        redeemablePoints: user.redeemablePoints || 0
      })
    }
    // socket.on(SOCKET_LISTENERS.JOIN_EVENT_ROOM, async (val) => {
    //   const eventIds = val?.payload?.eventIds;
    //   if (!eventIds || !Array.isArray(eventIds)) {
    //     console.log(eventIds);
    //     return;
    //   }

    //   socket.emit(SOCKET_EMITTERS.ROOM_JOINED_EVENT, {
    //     eventIds,
    //     message: "Event List",
    //   });

    // });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`)
    })
  })
}
