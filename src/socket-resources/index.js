import { createAdapter } from '@socket.io/redis-adapter'
import _ from 'lodash'
import { Server as SocketServer } from 'socket.io'
import Logger from '../libs/logger'
import { InternalServerErrorType } from '../libs/errorTypes'
import { isTrustedError } from '../utils/error.utils'
import argumentsDecoratorSocketMiddleware from './middlewares/argumentsDecoratorSocket.middleware'
import namespaces from './namespaces'

// TODO: specify the particular origin
const socketCorsOptions = {
  cors: { origin: { origin: '*' } }
}

const socketServer = new SocketServer(socketCorsOptions)

socketServer.on('new_namespace', (namespace) => {
  namespace.use((socket, next) => {
    socket.on('error', (error) => {
      if (isTrustedError(error)) {
        socket.emit('error', {
          data: {},
          errors: [
            _.pick(error, ['name', 'description', 'errorCode', 'fields'])
          ]
        })
      } else {
        Logger.error(error.name || InternalServerErrorType.name, {
          message: error.message || error.description,
          fault: error.fields
        })
        socket.emit('error', {
          data: {},
          errors: [
            _.pick(InternalServerErrorType, [
              'name',
              'description',
              'errorCode',
              'fields'
            ])
          ]
        })
      }
    })

    socket.use(argumentsDecoratorSocketMiddleware)
    next()
  })
})

// socketServer.adapter(createAdapter(redisClient.publisherClient, redisClient.subscriberClient))

namespaces(socketServer)

export default socketServer
