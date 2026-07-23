const authBaseUrl = 'http://localhost:5287/api'

export const authEndpoints = {
  login: `${authBaseUrl}/auth/login`,
  register: `${authBaseUrl}/auth/register`,
    me: `${authBaseUrl}/auth/me`,
  logout: `${authBaseUrl}/auth/logout`
} as const

export const technologiesEndpoints = {
    getTechnologies: `${authBaseUrl}/topics/technologies`,
    getTopics: `${authBaseUrl}/topics/sub`
} as const

export const quizEndpoints = {
    generateQuiz: `${authBaseUrl}/quiz/generate`,
    generateQuizWithFile: `${authBaseUrl}/quiz/generate-with-file`
} as const
