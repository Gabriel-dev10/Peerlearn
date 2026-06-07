import axios, { type AxiosInstance } from 'axios'

const TOKEN_KEY = 'peerlearn_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

function createApi(baseURL: string): AxiosInstance {
  const api = axios.create({ baseURL })
  api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  return api
}

export const authApi = createApi(
  import.meta.env.VITE_AUTH_URL ?? 'http://localhost:3001',
)
export const contentApi = createApi(
  import.meta.env.VITE_CONTENT_URL ?? 'http://localhost:3003',
)
export const reputationApi = createApi(
  import.meta.env.VITE_REPUTATION_URL ?? 'http://localhost:3004',
)
