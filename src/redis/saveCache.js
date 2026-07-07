export const saveCache = async (redisClient, cacheKey, cacheData, dataType) => {
  try {
    if (redisClient.status !== 'ready') {
      console.log(`Redis is not available. Skipping cache save for key: ${cacheKey}`)
      return
    }

    const valueToSave = typeof cacheData === 'string' ? cacheData : JSON.stringify(cacheData)

    await redisClient.set(cacheKey, valueToSave)
    redisClient.expireat(cacheKey, parseInt((+new Date()) / 1000) + 1800)

    console.log('Saved ---                                    >> ', cacheKey)
  } catch (e) {
    console.log(e)
    return e?.message || 'Error saving data to Redis'
  }
}
