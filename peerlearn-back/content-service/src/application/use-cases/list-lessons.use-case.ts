import type { ILessonRepository } from '../../domain/repositories/lesson.repository'
import { type LessonOutput, toLessonOutput } from '../mappers/lesson.mapper'

export class ListLessonsUseCase {
  constructor(private readonly lessons: ILessonRepository) {}

  async execute(): Promise<LessonOutput[]> {
    const all = await this.lessons.findAll()
    return all.map(toLessonOutput)
  }
}
