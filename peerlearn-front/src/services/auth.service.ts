import type { AuthToken, Profile } from '../types'
import { authApi } from './http'

export interface RegisterPayload {
  email: string
  password: string
  displayName: string
}

export interface LoginPayload {
  email: string
  password: string
}

export const authService = {
  async register(payload: RegisterPayload): Promise<void> {
    await authApi.post('/auth/register', payload)
  },

  async login(payload: LoginPayload): Promise<AuthToken> {
    const { data } = await authApi.post<AuthToken>('/auth/login', payload)
    return data
  },

  async me(): Promise<Profile> {
    const { data } = await authApi.get<Profile>('/auth/me')
    return data
  },

  async updateProfile(payload: {
    displayName?: string
    bio?: string
  }): Promise<Profile> {
    const { data } = await authApi.patch<Profile>('/auth/me', payload)
    return data
  },
}
