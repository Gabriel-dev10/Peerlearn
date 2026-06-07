import { beforeEach, describe, expect, it } from 'bun:test'
import { InMemoryTrailRepository } from '../../../test/in-memory-trail.repository'
import { InvalidTrailError } from '../../domain/errors/invalid-trail.error'
import { CreateTrailUseCase } from './create-trail.use-case'

describe('CreateTrailUseCase', () => {
  let trails: InMemoryTrailRepository
  let useCase: CreateTrailUseCase

  beforeEach(() => {
    trails = new InMemoryTrailRepository()
    useCase = new CreateTrailUseCase(trails)
  })

  it('deve criar uma trilha', async () => {
    const result = await useCase.execute({
      title: 'DevOps na prática',
      description: 'Docker, CI/CD e deploy',
      ownerId: 'owner-1',
    })

    expect(result.id).toBeDefined()
    expect(result.title).toBe('DevOps na prática')
    expect(trails.items).toHaveLength(1)
  })

  it('deve lançar erro quando o título é muito curto', async () => {
    await expect(
      useCase.execute({ title: 'ab', description: '', ownerId: 'owner-1' }),
    ).rejects.toBeInstanceOf(InvalidTrailError)
  })
})
