// if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET || !process.env.ZOHO_REDIRECT_URI) {
//   throw new Error('Missing required Zoho CRM environment variables');
// }
const zohoCRMConfig = {
  baseUrl: process.env.ZOHO_BASE_URL || 'https://www.zohoapis.com/crm/v2',
  tokenUrl: process.env.ZOHO_TOKEN_URL || 'https://accounts.zoho.com/oauth/v2/token',
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  redirectUri: process.env.ZOHO_REDIRECT_URI,
  accessToken: '',
  refreshToken: '1000.dbc23efb539b18d816793c18918ef712.3892ed377ccaefc1936e1315b83fcf38',
  authcode: process.env.ZOHO_AUTH_CODE
}

export default zohoCRMConfig
