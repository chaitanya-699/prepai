const authBaseUrl = 'http://localhost:5287/api/auth'

export const authEndpoints = {
  login: `${authBaseUrl}/login`,
  register: `${authBaseUrl}/register`,
    me: `${authBaseUrl}/me`,
  logout: `${authBaseUrl}/logout`
} as const
