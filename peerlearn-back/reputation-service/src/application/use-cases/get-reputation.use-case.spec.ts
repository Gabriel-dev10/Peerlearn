import { beforeEach, describe, expect, it } from 'bun:test'
import { InMemoryScoreRepository } from '../../../test/in-memory-score.repository'
import { GetReputationUseCase } from './get-reputation.use-case'

describe('GetReputationUseCase', () => {
  let scores: InMemoryScoreRepository
  let useCase: GetReputationUseCase

  beforeEach(() => {
    scores = new InMemoryScoreRepository()
    useCase = new GetReputationUseCase(scores)
  })

  it('deve decorar o nome com os badges conquistados (Decorator)', async () => {
    await scores.addXp('u1', 120)

    const result = await useCase.execute('u1', 'Maria')

    expect(result.xp).toBe(120)
    expect(result.badges.map((b) => b.name)).toEqual(['Iniciante', 'Mentor'])
    expect(result.displayName).toBe('🏅 🌱 Maria')
  })

  it('não deve adicionar badge quando o XP é baixo', async () => {
    await scores.addXp('u1', 10)

    const result = await useCase.execute('u1', 'João')

    expect(result.badges).toHaveLength(0)
    expect(result.displayName).toBe('João')
  })
})
