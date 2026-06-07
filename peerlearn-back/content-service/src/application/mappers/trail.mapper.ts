import type { Trail } from '../../domain/entities/trail.entity'

export interface TrailOutput {
  id: string
  title: string
  description: string
  ownerId: string
  createdAt: string
}

export function toTrailOutput(trail: Trail): TrailOutput {
  return {
    id: trail.id,
    title: trail.title,
    description: trail.description,
    ownerId: trail.ownerId,
    createdAt: trail.createdAt.toISOString(),
  }
}
