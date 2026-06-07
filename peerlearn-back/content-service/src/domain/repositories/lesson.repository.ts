import type { Content } from '../entities/content.entity'

export const LESSON_REPOSITORY = Symbol('LESSON_REPOSITORY')

export interface ILessonRepository {
  save(content: Content): Promise<void>
  findById(id: string): Promise<Content | null>
  findAll(): Promise<Content[]>
}
