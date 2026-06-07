import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { NotifySubscribersUseCase } from '../../application/use-cases/notify-subscribers.use-case'
import {
  LESSON_PUBLISHED,
  type LessonPublishedPayload,
} from '../../application/use-cases/publish-lesson.use-case'

@Injectable()
export class LessonPublishedListener {
  private readonly logger = new Logger(LessonPublishedListener.name)

  constructor(private readonly notifySubscribers: NotifySubscribersUseCase) {}

  @OnEvent(LESSON_PUBLISHED)
  async handle(payload: LessonPublishedPayload): Promise<void> {
    const { notified } = await this.notifySubscribers.execute(payload)
    this.logger.log(
      `Aula ${payload.lessonId} publicada — ${notified} inscritos notificados`,
    )
  }
}
