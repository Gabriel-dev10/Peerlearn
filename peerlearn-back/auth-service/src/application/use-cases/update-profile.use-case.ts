import type { IUserRepository } from '../../domain/repositories/user.repository'
import { UserNotFoundError } from '../errors/user-not-found.error'
import { type ProfileOutput, toProfileOutput } from '../mappers/profile.mapper'

export interface UpdateProfileInput {
  userId: string
  displayName?: string
  bio?: string | null
}

export class UpdateProfileUseCase {
  constructor(private readonly users: IUserRepository) {}

  async execute(input: UpdateProfileInput): Promise<ProfileOutput> {
    const user = await this.users.findById(input.userId)
    if (!user) {
      throw new UserNotFoundError(input.userId)
    }

    user.updateProfile({ displayName: input.displayName, bio: input.bio })
    await this.users.save(user)

    return toProfileOutput(user)
  }
}
