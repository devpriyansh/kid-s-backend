import axios from 'axios'
import zohoCRMConfig from '../../configs/zohoCRM.config'
import { messages } from '../../utils/constants/error.constants'
import redisClient from '../../redis/redisClient'
import { getCache } from '../../redis/getCache'
import { saveCache } from '../../redis/saveCache'

export default class ZohoCRMAxios {
  constructor (token) {
    // Initialize an Axios instance with default headers and base URL
    this.axiosInstance = axios.create({
      baseURL: zohoCRMConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || zohoCRMConfig.accessToken}` // Use the current access token
      }
    })
  }

  static async init () {
    console.log('init-----')
    let token = await getCache(redisClient.client, 'zohoAccessToken')
    console.log('token***', "'" + token + "'")

    if (!token) {
      console.log('Token not found in cache, trying to refresh...')

      token = await ZohoCRMAxios.refreshAccessToken()

      if (token) {
        await saveCache(redisClient.client, 'zohoAccessToken', token)
        console.log('New access token generated and stored in Redis.')
      } else {
        console.error('Failed to refresh access token.')
      }
    }

    return new ZohoCRMAxios(token)
  }

  /**
   * Generate access and refresh tokens using the authorization code.
   * This is typically used during the first-time setup to get initial tokens.
   * @param {string} authCode - Authorization code obtained from the Zoho authentication flow.
   * @returns {Object} - Object containing `access_token` and `refresh_token`.
   */
  // static async generateTokens (authCode) {
  //   try {
  //     const response = await axios.post(
  //       'https://accounts.zoho.com/oauth/v2/token',
  //       null, // No body required for this request
  //       {
  //         params: {
  //           grant_type: 'authorization_code',
  //           client_id: zohoCRMConfig.clientId,
  //           client_secret: zohoCRMConfig.clientSecret,
  //           redirect_uri: zohoCRMConfig.redirectUri,
  //           code: authCode
  //         }
  //       }
  //     )

  //     if (response.status === 200) {
  //       // Check for an error in the response data
  //       if (response.data.error) {
  //         console.error('Error in token response:', response.data.error)
  //         return response.data.error
  //       }

  //       const { access_token, refresh_token, expires_in } = response.data
  //       // Update the tokens in the config
  //       await saveCache(redisClient.client,"zohoAccessToken",access_token);
  //       zohoCRMConfig.accessToken = access_token
  //       if (refresh_token) {
  //         await saveCache(redisClient.client,"zohoRefreshToken",refresh_token);
  //         zohoCRMConfig.refreshToken = refresh_token
  //       }
  //       console.log(`Access token generated. Expires in: ${expires_in} seconds.`)
  //       return { access_token, refresh_token }
  //     }

  //     throw response.data?.errors
  //   } catch (error) {
  //     // Handle service unavailability or other errors
  //     throw error
  //   }
  // }

  /**
   * Refresh the access token using the refresh token.
   * This is used when the current access token expires (e.g., after 1 hour).
   * @returns {string} - The new access token.
   */
  static async refreshAccessToken () {
    try {
      console.log('token refereshing ----   ')
      const response = await axios.post(
        'https://accounts.zoho.com/oauth/v2/token',
        null, // No body required for this request
        {
          params: {
            refresh_token: zohoCRMConfig.refreshToken,
            client_id: zohoCRMConfig.clientId,
            client_secret: zohoCRMConfig.clientSecret,
            grant_type: 'refresh_token'
          }
        }
      )
      const requestConfig = {
        method: 'post',
        url: 'https://accounts.zoho.com/oauth/v2/token',
        params: {
          refresh_token: zohoCRMConfig.refreshToken,
          client_id: zohoCRMConfig.clientId,
          client_secret: zohoCRMConfig.clientSecret,
          grant_type: 'refresh_token'
        }
      }
      console.log('Request Config:', requestConfig)
      console.log('Refresh token response status:', response.status)
      console.log('Refresh token response data:', response.data)
      if (response.status === 200) {
        const { access_token, expires_in } = response.data

        if (!access_token) {
          throw messages.SERVICE_UNAVAILABLE
        }
        await ZohoCRMAxios.logTokenRefresh(access_token)
        // Update the access token in the config
        zohoCRMConfig.accessToken = access_token
        console.log(`Access token refreshed. Expires in: "${access_token}" ${expires_in || 'unknown'} seconds.`)
        return access_token
      }

      throw response.data?.errors
    } catch (error) {
      console.log('refresh token error ', error)
      // Handle service unavailability or other errors
      throw error
    }
  }

  static async logTokenRefresh (token) {
    try {
      const logPayload = [
        {
          server: 'Game Engine Backend',
          'Date and Time': new Date().toISOString(),
          Token: token
        }
      ]

      const logResponse = await axios.post(
        'https://admin-api.dfs.use1.dev.eazy6sports.com/api/custom-log-for-zoho',
        logPayload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('Custom log for Zoho token refresh sent:', logResponse.status)
    } catch (logError) {
      console.error('Failed to send token refresh log:', logError.message)
    }
  }

  /**
   * Generic method to handle API requests with retry logic for token expiration.
   * @param {string} method - HTTP method (GET, POST, PUT, etc.).
   * @param {string} endpoint - API endpoint relative to the base URL.
   * @param {Object|null} data - Request body, if applicable.
   * @returns {Object} - Response data from the API.
   */
  async requestWithRetry (method, endpoint, data = null, retryAttempted = false) {
    try {
      const response = await this.axiosInstance({
        method,
        url: endpoint,
        data
      })
      console.log('response:', method, endpoint, response.status)

      if (response.status === 200 || response.status === 201) {
        return response.data
      }
      console.log('response 2 request entry retry ', response?.data?.data)
      throw response.data?.data?.[0]?.message
    } catch (error) {
      if (error.response?.status === 401 && !retryAttempted) {
        console.log('Access token expired. Refreshing...')
        const newToken = await ZohoCRMAxios.refreshAccessToken()
        await saveCache(redisClient.client, 'zohoAccessToken', newToken)
        this.token = newToken
        this.axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`
        console.log('Retrying request with new token...')
        return this.requestWithRetry(method, endpoint, data, true) // Retry with the flag set to true
      }

      // Throw a general service unavailability error for other issues
      throw messages.SERVICE_UNAVAILABLE
    }
  }

  /**
   * Create a new entity (e.g., Lead, Contact) in Zoho CRM.
   * @param {string} entityType - The type of entity (e.g., 'Leads', 'Contacts').
   * @param {Object} entityData - The data for the entity to be created.
   * @returns {Object} - Response data from the API.
   */
  async createEntity (entityType, entityData) {
    return this.requestWithRetry('post', `/${entityType}`, { data: [entityData] })
  }

  /**
   * Update an existing entity (e.g., Lead, Contact) in Zoho CRM.
   * @param {string} entityType - The type of entity (e.g., 'Leads', 'Contacts').
   * @param {string} entityId - The ID of the entity to update.
   * @param {Object} updateData - The data for the update.
   * @returns {Object} - Response data from the API.
   */
  async updateEntity (entityType, entityId, updateData) {
    return this.requestWithRetry('put', `/${entityType}/${entityId}`, { data: [updateData] })
  }

  /**
   * Fetch entities (e.g., Leads, Contacts) from Zoho CRM.
   * Can fetch all entities or a specific one by ID.
   * @param {string} entityType - The type of entity (e.g., 'Leads', 'Contacts').
   * @param {string|null} entityId - The ID of the specific entity to fetch (optional).
   * @returns {Object} - Response data from the API.
   */
  async getEntities (entityType, entityId = null) {
    const endpoint = entityId ? `/${entityType}/${entityId}` : `/${entityType}`
    return this.requestWithRetry('get', endpoint)
  }

  /**
 * Convert a lead into a contact in Zoho CRM.
 * @param {string} leadId - The ID of the lead to convert.
 * @returns {Object} - Response data from the API.
 */
  async convertLeadToContact (leadId) {
    try {
      const endpoint = `/Leads/${leadId}/actions/convert`
      const data = { data: [{ stage: 'Converted' }] }
      const response = await this.axiosInstance.post(endpoint, data)

      if (response.status === 200 || response.status === 201) {
        return response.data
      }

      throw response.data?.errors
    } catch (error) {
      if (error.response?.status === 401) {
      // Token expired, refresh and retry
        console.log('Access token expired. Refreshing token...')
        await ZohoCRMAxios.refreshAccessToken()
        return ZohoCRMAxios.convertLeadToContact(leadId) // Retry after refreshing token
      }

      // Throw a general service unavailability error for other issues
      throw messages.SERVICE_UNAVAILABLE
    }
  }
}
