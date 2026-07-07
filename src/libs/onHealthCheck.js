import Logger from '../libs/logger'
import { sequelize } from '../db/models'
import redisClient from './redisClient'

export default async () => {
  let isDbHealthy = false
  let isRedisHealthy = false

  // DB Check
  try {
    await sequelize.authenticate()
    isDbHealthy = true
    Logger.info('HealthCheck', { message: 'Database: OK' })
  } catch (error) {
    Logger.error('HealthCheck', {
      message: 'Database: FAILED',
      exception: error
    })
  }

  // Redis Check
  try {
    isRedisHealthy =
    redisClient?.publisherClient?.status === 'ready' ||
    redisClient?.client?.status === 'ready' ||
    redisClient?.status === 'ready' ||
    redisClient?.isReady === true

    Logger.info('HealthCheck', {
      message: `Redis: ${isRedisHealthy ? 'OK' : 'NOT READY'}`
    })
  } catch (error) {
    Logger.error('HealthCheck', {
      message: 'Redis: FAILED',
      exception: error
    })
  }

  const isHealthy = isDbHealthy && isRedisHealthy

  return {
    status: isHealthy ? 'UP' : 'DOWN',
    uptime: process.uptime(),
    timestamp: Date.now(),
    services: {
      database: isDbHealthy ? 'UP' : 'DOWN',
      redis: isRedisHealthy ? 'UP' : 'DOWN'
    }
  }
}
