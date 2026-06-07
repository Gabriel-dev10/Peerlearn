import { randomUUID } from 'node:crypto'
import { Comment } from '../../domain/entities/comment.entity'
import type { ICommentRepository } from '../../domain/repositories/comment.repository'
import type { ILessonRepository } from '../../domain/repositories/lesson.repository'
import { LessonNotFoundError } from '../errors/lesson-not-found.error'
import { type CommentOutput, toCommentOutput } from '../mappers/comment.mapper'

export interface AddCommentInput {
  lessonId: string
  authorId: string
  text: string
}

export class AddCommentUseCase {
  constructor(
    private readonly comments: ICommentRepository,
    private readonly lessons: ILessonRepository,
  ) {}

  async execute(input: AddCommentInput): Promise<CommentOutput> {
    const lesson = await this.lessons.findById(input.lessonId)
    if (!lesson) {
      throw new LessonNotFoundError(input.lessonId)
    }

    const comment = Comment.create({
      id: randomUUID(),
      lessonId: input.lessonId,
      authorId: input.authorId,
      text: input.text,
    })

    await this.comments.save(comment)

    return toCommentOutput(comment)
  }
}
