import { Injectable } from '@nestjs/common'
import type { ContentType as PrismaContentType } from '@prisma/client'
import type { Content, ContentType } from '../../domain/entities/content.entity'
import { ContentFactory } from '../../domain/factories/content.factory'
import type { ILessonRepository } from '../../domain/repositories/lesson.repository'
import { PrismaService } from './prisma.service'

interface LessonRow {
  id: string
  type: PrismaContentType
  title: string
  body: string
  authorId: string
  trailId: string | null
  createdAt: Date
}

@Injectable()
export class PrismaLessonRepository implements ILessonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(content: Content): Promise<void> {
    const data = {
      type: content.type as PrismaContentType,
      title: content.title,
      body: content.body,
      authorId: content.authorId,
      trailId: content.trailId,
    }

    await this.prisma.lesson.upsert({
      where: { id: content.id },
      create: { id: content.id, ...data },
      update: data,
    })
  }

  async findById(id: string): Promise<Content | null> {
    const row = await this.prisma.lesson.findUnique({ where: { id } })
    return row ? this.toDomain(row) : null
  }

  async findAll(): Promise<Content[]> {
    const rows = await this.prisma.lesson.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return rows.map((row) => this.toDomain(row))
  }

  private toDomain(row: LessonRow): Content {
    return ContentFactory.create(row.type as ContentType, {
      id: row.id,
      title: row.title,
      body: row.body,
      authorId: row.authorId,
      trailId: row.trailId,
      createdAt: row.createdAt,
    })
  }
}
