import type { Comment } from '../../domain/entities/comment.entity'

export interface CommentOutput {
  id: string
  lessonId: string
  authorId: string
  text: string
  createdAt: string
}

export function toCommentOutput(comment: Comment): CommentOutput {
  return {
    id: comment.id,
    lessonId: comment.lessonId,
    authorId: comment.authorId,
    text: comment.text,
    createdAt: comment.createdAt.toISOString(),
  }
}
