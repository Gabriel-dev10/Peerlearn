import type { Comment } from '../entities/comment.entity'

export const COMMENT_REPOSITORY = Symbol('COMMENT_REPOSITORY')

export interface ICommentRepository {
  save(comment: Comment): Promise<void>
  findByLessonId(lessonId: string): Promise<Comment[]>
}
