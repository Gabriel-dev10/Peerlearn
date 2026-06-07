import { randomUUID } from 'node:crypto'
import { User, type UserRole } from '../../domain/entities/user.entity'
import type { IUserRepository } from '../../domain/repositories/user.repository'
import { EmailAlreadyInUseError } from '../errors/email-already-in-use.error'
import type { IHashProvider } from '../ports/hash.provider'

export interface RegisterInput {
  email: string
  password: string
  displayName: string
}

export interface RegisterOutput {
  userId: string
  email: string
  role: UserRole
  displayName: string
}

export class RegisterUseCase {
  constructor(
    private readonly users: IUserRepository,
    private readonly hasher: IHashProvider,
  ) {}

  async execute(input: RegisterInput): Promise<RegisterOutput> {
    const existing = await this.users.findByEmail(input.email)
    if (existing) {
      throw new EmailAlreadyInUseError(input.email)
    }

    const passwordHash = await this.hasher.hash(input.password)
    const user = User.create({
      id: randomUUID(),
      email: input.email,
      passwordHash,
      displayName: input.displayName,
    })

    await this.users.save(user)

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      displayName: user.displayName,
    }
  }
}
