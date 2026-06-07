import type { ILessonRepository } from '../../domain/repositories/lesson.repository'
import { LessonNotFoundError } from '../errors/lesson-not-found.error'
import { type LessonOutput, toLessonOutput } from '../mappers/lesson.mapper'

export class GetLessonUseCase {
  constructor(private readonly lessons: ILessonRepository) {}

  async execute(lessonId: string): Promise<LessonOutput> {
    const lesson = await this.lessons.findById(lessonId)
    if (!lesson) {
      throw new LessonNotFoundError(lessonId)
    }
    return toLessonOutput(lesson)
  }
}
