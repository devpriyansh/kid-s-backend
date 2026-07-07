export const deleteCache = async (redisClient, cacheKey) => {
  try {
    // Check if Redis is connected
    if (redisClient.status !== 'ready') {
      console.log(`Redis is not available. Skipping cache deletion for key: ${cacheKey}`)
      return
    }

    // Delete the cache entry
    await redisClient.del(cacheKey)
    console.log(`Deleted cache for key: ${cacheKey}`)
  } catch (e) {
    console.log(`Error deleting cache for key: ${cacheKey} - ${e.message}`)
  }
}
