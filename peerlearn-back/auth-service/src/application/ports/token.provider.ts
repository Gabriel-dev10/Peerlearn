import type { UserRole } from '../../domain/entities/user.entity'

export const TOKEN_PROVIDER = Symbol('TOKEN_PROVIDER')

export interface TokenPayload {
  sub: string
  email: string
  role: UserRole
}

export interface ITokenProvider {
  sign(payload: TokenPayload): string
}
