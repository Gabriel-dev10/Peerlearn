export type ContentType = 'video' | 'text' | 'quiz'

export interface CreateContentDto {
  type: ContentType
  title: string
  body: string
  authorId: string
  trackId?: string | null
}

export interface LessonDto {
  id: string
  type: ContentType
  title: string
  body: string
  authorId: string
  trackId: string | null
  createdAt: string
}
