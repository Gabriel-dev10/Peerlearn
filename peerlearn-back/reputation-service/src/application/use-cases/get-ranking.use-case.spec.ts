import { beforeEach, describe, expect, it } from 'bun:test'
import { InMemoryScoreRepository } from '../../../test/in-memory-score.repository'
import { GetRankingUseCase } from './get-ranking.use-case'

describe('GetRankingUseCase', () => {
  let scores: InMemoryScoreRepository
  let useCase: GetRankingUseCase

  beforeEach(() => {
    scores = new InMemoryScoreRepository()
    useCase = new GetRankingUseCase(scores)
  })

  it('deve retornar os usuários ordenados por XP decrescente', async () => {
    await scores.addXp('u1', 30)
    await scores.addXp('u2', 90)
    await scores.addXp('u3', 60)

    const result = await useCase.execute(2)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ userId: 'u2', xp: 90 })
    expect(result[1]).toEqual({ userId: 'u3', xp: 60 })
  })
})
