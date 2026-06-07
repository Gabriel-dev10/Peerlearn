import { Inject, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
  type IReputationGateway,
  REPUTATION_GATEWAY,
} from '../../application/ports/reputation.gateway'
import {
  LESSON_PUBLISHED,
  type LessonPublishedPayload,
} from '../../application/use-cases/publish-lesson.use-case'

@Injectable()
export class AwardXpOnLessonPublishedListener {
  constructor(
    @Inject(REPUTATION_GATEWAY)
    private readonly reputation: IReputationGateway,
  ) {}

  @OnEvent(LESSON_PUBLISHED)
  async handle(payload: LessonPublishedPayload): Promise<void> {
    await this.reputation.awardLessonPublished(payload.authorId)
  }
}
