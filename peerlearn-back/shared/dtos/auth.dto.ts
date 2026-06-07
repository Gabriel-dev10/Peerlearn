import type { UserRole } from '../interfaces/user-role.enum'

export interface RegisterDto {
  email: string
  password: string
  displayName: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface AuthTokenDto {
  token: string
  userId: string
  role: UserRole
}
