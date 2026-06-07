import { earnedBadges } from '../../domain/decorators/badge-catalog'
import {
  type Badge,
  BadgeDecorator,
  BaseUserProfile,
  type UserProfile,
} from '../../domain/decorators/badge.decorator'
import type { IScoreRepository } from '../../domain/repositories/score.repository'

export interface ReputationOutput {
  userId: string
  xp: number
  displayName: string
  badges: Badge[]
}

export class GetReputationUseCase {
  constructor(private readonly scores: IScoreRepository) {}

  async execute(
    userId: string,
    displayName = 'Aluno',
  ): Promise<ReputationOutput> {
    const xp = await this.scores.getXp(userId)
    const badges = earnedBadges(xp)

    let profile: UserProfile = new BaseUserProfile(displayName)
    for (const badge of badges) {
      profile = new BadgeDecorator(profile, badge)
    }

    return { userId, xp, displayName: profile.getDisplayName(), badges }
  }
}
