import { randomUUID } from 'node:crypto'
import { Notification } from '../../domain/entities/notification.entity'
import type { INotificationRepository } from '../../domain/repositories/notification.repository'
import type { ISubscriberProvider } from '../ports/subscriber.provider'
import type { LessonPublishedPayload } from './publish-lesson.use-case'

export interface NotifySubscribersOutput {
  notified: number
}

export class NotifySubscribersUseCase {
  constructor(
    private readonly notifications: INotificationRepository,
    private readonly subscribers: ISubscriberProvider,
  ) {}

  async execute(
    event: LessonPublishedPayload,
  ): Promise<NotifySubscribersOutput> {
    const subscribers = await this.subscribers.getSubscribers(event.trailId)
    const targets = subscribers.filter((userId) => userId !== event.authorId)

    for (const userId of targets) {
      const notification = Notification.create({
        id: randomUUID(),
        userId,
        message: `Nova micro-aula publicada: ${event.title}`,
      })
      await this.notifications.save(notification)
    }

    return { notified: targets.length }
  }
}
