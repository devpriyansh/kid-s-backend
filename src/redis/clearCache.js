export const clearCache = async (redisClient) => {
  try {
    // Check if Redis is connected
    if (redisClient.status !== 'ready') {
      console.log('Redis is not available. Skipping cache clearing.')
      return
    }

    // Clear the Redis database
    await redisClient.flushdb((err, succeeded) => {
      if (err) {
        console.log('Error clearing cache:', err.message)
      } else {
        console.log('Cache cleared successfully:', succeeded) // `succeeded` should be true if successful
      }
    })
  } catch (e) {
    console.log('Error during cache clearing operation:', e.message)
  }
}
