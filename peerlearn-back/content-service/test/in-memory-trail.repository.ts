import type { Trail } from '../src/domain/entities/trail.entity'
import type { ITrailRepository } from '../src/domain/repositories/trail.repository'

export class InMemoryTrailRepository implements ITrailRepository {
  public readonly items: Trail[] = []

  async save(trail: Trail): Promise<void> {
    this.items.push(trail)
  }

  async findById(id: string): Promise<Trail | null> {
    return this.items.find((trail) => trail.id === id) ?? null
  }

  async findAll(): Promise<Trail[]> {
    return [...this.items]
  }
}
