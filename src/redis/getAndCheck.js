export const getAndSave = async (redisClient, key) => {
  try {
    // Check if Redis is connected
    if (redisClient.status !== 'ready') {
      return {
        isCached: false,
        data: ''
      }
    }

    // Proceed to get data from cache if Redis is connected
    const data = await getCache(redisClient, key)
    if (data) {
      return {
        isCached: true,
        data
      }
    }

    return {
      isCached: false,
      data: ''
    }
  } catch (e) {
    return {
      isCached: false,
      data: ''
    }
  }
}
