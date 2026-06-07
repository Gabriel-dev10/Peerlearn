import type { ITrailRepository } from '../../domain/repositories/trail.repository'
import { type TrailOutput, toTrailOutput } from '../mappers/trail.mapper'

export class ListTrailsUseCase {
  constructor(private readonly trails: ITrailRepository) {}

  async execute(): Promise<TrailOutput[]> {
    const all = await this.trails.findAll()
    return all.map(toTrailOutput)
  }
}
