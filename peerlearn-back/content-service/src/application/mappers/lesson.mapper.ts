import type { Content, ContentType } from '../../domain/entities/content.entity'

export interface LessonOutput {
  id: string
  type: ContentType
  title: string
  body: string
  authorId: string
  trailId: string | null
  createdAt: string
}

export function toLessonOutput(content: Content): LessonOutput {
  return {
    id: content.id,
    type: content.type,
    title: content.title,
    body: content.body,
    authorId: content.authorId,
    trailId: content.trailId,
    createdAt: content.createdAt.toISOString(),
  }
}
