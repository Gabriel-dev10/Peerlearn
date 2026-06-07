import { randomUUID } from 'node:crypto'
import { Trail } from '../../domain/entities/trail.entity'
import type { ITrailRepository } from '../../domain/repositories/trail.repository'
import { type TrailOutput, toTrailOutput } from '../mappers/trail.mapper'

export interface CreateTrailInput {
  title: string
  description: string
  ownerId: string
}

export class CreateTrailUseCase {
  constructor(private readonly trails: ITrailRepository) {}

  async execute(input: CreateTrailInput): Promise<TrailOutput> {
    const trail = Trail.create({
      id: randomUUID(),
      title: input.title,
      description: input.description,
      ownerId: input.ownerId,
    })

    await this.trails.save(trail)

    return toTrailOutput(trail)
  }
}
