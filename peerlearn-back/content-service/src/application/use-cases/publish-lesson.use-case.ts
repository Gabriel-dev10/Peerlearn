import { randomUUID } from 'node:crypto'
import type { ContentType } from '../../domain/entities/content.entity'
import { ContentFactory } from '../../domain/factories/content.factory'
import type { ILessonRepository } from '../../domain/repositories/lesson.repository'
import { type LessonOutput, toLessonOutput } from '../mappers/lesson.mapper'
import type { IEventPublisher } from '../ports/event-publisher'

export const LESSON_PUBLISHED = 'lesson.published'

export interface LessonPublishedPayload {
  lessonId: string
  authorId: string
  title: string
  trailId: string | null
}

export interface PublishLessonInput {
  type: ContentType
  title: string
  body: string
  authorId: string
  trailId?: string | null
}

export class PublishLessonUseCase {
  constructor(
    private readonly lessons: ILessonRepository,
    private readonly events: IEventPublisher,
  ) {}

  async execute(input: PublishLessonInput): Promise<LessonOutput> {
    const content = ContentFactory.create(input.type, {
      id: randomUUID(),
      title: input.title,
      body: input.body,
      authorId: input.authorId,
      trailId: input.trailId,
    })

    await this.lessons.save(content)

    const payload: LessonPublishedPayload = {
      lessonId: content.id,
      authorId: content.authorId,
      title: content.title,
      trailId: content.trailId,
    }
    await this.events.publish(LESSON_PUBLISHED, payload)

    return toLessonOutput(content)
  }
}
