import type { UserRole } from '../../domain/entities/user.entity'
import type { IUserRepository } from '../../domain/repositories/user.repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials.error'
import type { IHashProvider } from '../ports/hash.provider'
import type { ITokenProvider } from '../ports/token.provider'

export interface LoginInput {
  email: string
  password: string
}

export interface LoginOutput {
  token: string
  userId: string
  role: UserRole
}

export class LoginUseCase {
  constructor(
    private readonly users: IUserRepository,
    private readonly hasher: IHashProvider,
    private readonly tokens: ITokenProvider,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.users.findByEmail(input.email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordMatches = await this.hasher.compare(
      input.password,
      user.passwordHash,
    )
    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    const token = this.tokens.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    })

    return { token, userId: user.id, role: user.role }
  }
}
