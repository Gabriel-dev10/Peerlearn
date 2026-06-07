import type { Trail } from '../entities/trail.entity'

export const TRAIL_REPOSITORY = Symbol('TRAIL_REPOSITORY')

export interface ITrailRepository {
  save(trail: Trail): Promise<void>
  findById(id: string): Promise<Trail | null>
  findAll(): Promise<Trail[]>
}
