import { beforeEach, describe, expect, it } from 'bun:test'
import { InMemoryScoreRepository } from '../../../test/in-memory-score.repository'
import { XpStrategyResolver } from '../../domain/strategies/xp-strategy.resolver'
import { AwardXpUseCase } from './award-xp.use-case'

describe('AwardXpUseCase', () => {
  let scores: InMemoryScoreRepository
  let useCase: AwardXpUseCase

  beforeEach(() => {
    scores = new InMemoryScoreRepository()
    useCase = new AwardXpUseCase(new XpStrategyResolver(), scores)
  })

  it('deve conceder 50 XP ao publicar e acumular o total', async () => {
    const first = await useCase.execute({
      userId: 'u1',
      action: 'publish_lesson',
    })
    expect(first.awarded).toBe(50)
    expect(first.total).toBe(50)

    const second = await useCase.execute({
      userId: 'u1',
      action: 'leave_comment',
    })
    expect(second.awarded).toBe(10)
    expect(second.total).toBe(60)
  })
})
