import type { Notification } from '../../domain/entities/notification.entity'

export interface NotificationOutput {
  id: string
  userId: string
  message: string
  read: boolean
  createdAt: string
}

export function toNotificationOutput(
  notification: Notification,
): NotificationOutput {
  return {
    id: notification.id,
    userId: notification.userId,
    message: notification.message,
    read: notification.read,
    createdAt: notification.createdAt.toISOString(),
  }
}
