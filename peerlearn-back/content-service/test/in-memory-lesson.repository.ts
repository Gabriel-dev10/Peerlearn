import type { Content } from '../src/domain/entities/content.entity'
import type { ILessonRepository } from '../src/domain/repositories/lesson.repository'

export class InMemoryLessonRepository implements ILessonRepository {
  public readonly items: Content[] = []

  async save(content: Content): Promise<void> {
    this.items.push(content)
  }

  async findById(id: string): Promise<Content | null> {
    return this.items.find((content) => content.id === id) ?? null
  }

  async findAll(): Promise<Content[]> {
    return [...this.items]
  }
}
