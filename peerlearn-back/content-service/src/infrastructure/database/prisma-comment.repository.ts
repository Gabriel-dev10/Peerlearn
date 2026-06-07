import { Injectable } from '@nestjs/common'
import { Comment } from '../../domain/entities/comment.entity'
import type { ICommentRepository } from '../../domain/repositories/comment.repository'
import { PrismaService } from './prisma.service'

interface CommentRow {
  id: string
  lessonId: string
  authorId: string
  text: string
  createdAt: Date
}

@Injectable()
export class PrismaCommentRepository implements ICommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(comment: Comment): Promise<void> {
    await this.prisma.comment.create({
      data: {
        id: comment.id,
        lessonId: comment.lessonId,
        authorId: comment.authorId,
        text: comment.text,
      },
    })
  }

  async findByLessonId(lessonId: string): Promise<Comment[]> {
    const rows = await this.prisma.comment.findMany({
      where: { lessonId },
      orderBy: { createdAt: 'asc' },
    })
    return rows.map((row) => this.toDomain(row))
  }

  private toDomain(row: CommentRow): Comment {
    return Comment.create({
      id: row.id,
      lessonId: row.lessonId,
      authorId: row.authorId,
      text: row.text,
      createdAt: row.createdAt,
    })
  }
}
