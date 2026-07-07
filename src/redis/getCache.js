export const getCache = async (redisClient, cacheKey) => {
  try {
    if (redisClient.status !== 'ready') {
      console.log(`Redis client is not ready. Current status: ${redisClient.status}`)
      return null
    }

    const cachedData = await redisClient.get(cacheKey)
    if (!cachedData) return null

    try {
      return JSON.parse(cachedData)
    } catch (parseError) {
      // If data is not JSON, return as plain string
      return cachedData
    }
  } catch (e) {
    console.error(`Error in getCache for key "${cacheKey}":`, e)
    return e?.message || 'Error fetching data from Redis'
  }
}
