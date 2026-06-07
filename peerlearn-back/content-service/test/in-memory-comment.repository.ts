import type { Comment } from '../src/domain/entities/comment.entity'
import type { ICommentRepository } from '../src/domain/repositories/comment.repository'

export class InMemoryCommentRepository implements ICommentRepository {
  public readonly items: Comment[] = []

  async save(comment: Comment): Promise<void> {
    this.items.push(comment)
  }

  async findByLessonId(lessonId: string): Promise<Comment[]> {
    return this.items.filter((comment) => comment.lessonId === lessonId)
  }
}
