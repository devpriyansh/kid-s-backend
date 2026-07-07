import Redis from 'ioredis'
import config from '../configs/app.config'

const redisUrl = config.get('pub_sub_redis_db.url')

const connection = redisUrl ? redisUrl : {
  host: config.get('pub_sub_redis_db.host'),
  port: config.get('pub_sub_redis_db.port'),
  password: config.get('pub_sub_redis_db.password')
  // TLS enabled, but CA verification disabled
  // tls: {
  //   rejectUnauthorized: false,
  // },
}

const publisherClient = new Redis(connection)
const subscriberClient = new Redis(connection)
const client = new Redis(connection)

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
  connection,
  publisherClient,
  subscriberClient,
  client
}
