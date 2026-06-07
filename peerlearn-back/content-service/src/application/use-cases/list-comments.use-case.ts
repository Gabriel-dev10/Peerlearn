import type { ICommentRepository } from '../../domain/repositories/comment.repository'
import { type CommentOutput, toCommentOutput } from '../mappers/comment.mapper'

export class ListCommentsUseCase {
  constructor(private readonly comments: ICommentRepository) {}

  async execute(lessonId: string): Promise<CommentOutput[]> {
    const all = await this.comments.findByLessonId(lessonId)
    return all.map(toCommentOutput)
  }
}
