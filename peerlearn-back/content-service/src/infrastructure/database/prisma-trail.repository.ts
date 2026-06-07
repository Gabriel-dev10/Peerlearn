import { Injectable } from '@nestjs/common'
import { Trail } from '../../domain/entities/trail.entity'
import type { ITrailRepository } from '../../domain/repositories/trail.repository'
import { PrismaService } from './prisma.service'

interface TrailRow {
  id: string
  title: string
  description: string
  ownerId: string
  createdAt: Date
}

@Injectable()
export class PrismaTrailRepository implements ITrailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(trail: Trail): Promise<void> {
    const data = {
      title: trail.title,
      description: trail.description,
      ownerId: trail.ownerId,
    }

    await this.prisma.trail.upsert({
      where: { id: trail.id },
      create: { id: trail.id, ...data },
      update: data,
    })
  }

  async findById(id: string): Promise<Trail | null> {
    const row = await this.prisma.trail.findUnique({ where: { id } })
    return row ? this.toDomain(row) : null
  }

  async findAll(): Promise<Trail[]> {
    const rows = await this.prisma.trail.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return rows.map((row) => this.toDomain(row))
  }

  private toDomain(row: TrailRow): Trail {
    return Trail.create({
      id: row.id,
      title: row.title,
      description: row.description,
      ownerId: row.ownerId,
      createdAt: row.createdAt,
    })
  }
}
