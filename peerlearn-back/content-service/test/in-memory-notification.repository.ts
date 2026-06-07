import type { Notification } from '../src/domain/entities/notification.entity'
import type { INotificationRepository } from '../src/domain/repositories/notification.repository'

export class InMemoryNotificationRepository implements INotificationRepository {
  public readonly items: Notification[] = []

  async save(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    return this.items.filter((notification) => notification.userId === userId)
  }
}
