import type { INotificationRepository } from '../../domain/repositories/notification.repository'
import {
  type NotificationOutput,
  toNotificationOutput,
} from '../mappers/notification.mapper'

export class ListNotificationsUseCase {
  constructor(private readonly notifications: INotificationRepository) {}

  async execute(userId: string): Promise<NotificationOutput[]> {
    const items = await this.notifications.findByUserId(userId)
    return items.map(toNotificationOutput)
  }
}
