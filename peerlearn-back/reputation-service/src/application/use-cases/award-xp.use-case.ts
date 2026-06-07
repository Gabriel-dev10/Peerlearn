import type { IScoreRepository } from '../../domain/repositories/score.repository'
import type { XpStrategyResolver } from '../../domain/strategies/xp-strategy.resolver'
import type { XpAction } from '../../domain/strategies/xp.strategy'

export interface AwardXpInput {
  userId: string
  action: XpAction
}

export interface AwardXpOutput {
  userId: string
  awarded: number
  total: number
}

export class AwardXpUseCase {
  constructor(
    private readonly resolver: XpStrategyResolver,
    private readonly scores: IScoreRepository,
  ) {}

  async execute(input: AwardXpInput): Promise<AwardXpOutput> {
    const strategy = this.resolver.resolve(input.action)
    const awarded = strategy.calculate({
      userId: input.userId,
      action: input.action,
    })

    const total = await this.scores.addXp(input.userId, awarded)

    return { userId: input.userId, awarded, total }
  }
}
