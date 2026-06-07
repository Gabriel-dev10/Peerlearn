import type { IUserRepository } from '../../domain/repositories/user.repository'
import { UserNotFoundError } from '../errors/user-not-found.error'
import { type ProfileOutput, toProfileOutput } from '../mappers/profile.mapper'

export class GetProfileUseCase {
  constructor(private readonly users: IUserRepository) {}

  async execute(userId: string): Promise<ProfileOutput> {
    const user = await this.users.findById(userId)
    if (!user) {
      throw new UserNotFoundError(userId)
    }
    return toProfileOutput(user)
  }
}
