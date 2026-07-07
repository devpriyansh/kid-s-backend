import Redis from 'ioredis'
import config from '../configs/app.config'

const redisUrl = config.get('pub_sub_redis_db.url')

const retryStrategy = (times) => {
  if (times >= 3) {
    console.warn('Redis connection failed 3 times. Disabling reconnects to prevent log spam.');
    return null; // Stop retrying
  }
  return Math.min(times * 500, 2000);
};

const connectionOptions = {
  host: config.get('pub_sub_redis_db.host'),
  port: config.get('pub_sub_redis_db.port'),
  password: config.get('pub_sub_redis_db.password'),
  retryStrategy
};

const publisherClient = redisUrl ? new Redis(redisUrl, { retryStrategy }) : new Redis(connectionOptions)
const subscriberClient = redisUrl ? new Redis(redisUrl, { retryStrategy }) : new Redis(connectionOptions)
const client = redisUrl ? new Redis(redisUrl, { retryStrategy }) : new Redis(connectionOptions)

// Common function to handle connection events
const handleRedisEvents = (client, name) => {
  client.on('connect', () => {
    console.log(`${name} connected to Redis`)
  })

  client.on('ready', () => {
    console.log(`${name} is ready to use`)
  })

  client.on('error', (err) => {
    console.error(`${name} connection error:`, err)
  })

  client.on('close', () => {
    console.log(`${name} connection closed`)
  })

  client.on('reconnecting', () => {
    console.log(`${name} reconnecting to Redis`)
  })
}

// Apply event handlers to each Redis client
handleRedisEvents(publisherClient, 'Publisher Client')
handleRedisEvents(subscriberClient, 'Subscriber Client')
handleRedisEvents(client, 'Client')

// Export the clients
export default {
  connection: connectionOptions,
  publisherClient,
  subscriberClient,
  client
}
