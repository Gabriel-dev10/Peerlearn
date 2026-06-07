import { Injectable } from '@nestjs/common'
import { Notification } from '../../domain/entities/notification.entity'
import type { INotificationRepository } from '../../domain/repositories/notification.repository'
import { PrismaService } from './prisma.service'

interface NotificationRow {
  id: string
  userId: string
  message: string
  read: boolean
  createdAt: Date
}

@Injectable()
export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(notification: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id: notification.id,
        userId: notification.userId,
        message: notification.message,
        read: notification.read,
      },
    })
  }

  async findByUserId(userId: string): Promise<Notification[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return rows.map((row) => this.toDomain(row))
  }

  private toDomain(row: NotificationRow): Notification {
    return Notification.create({
      id: row.id,
      userId: row.userId,
      message: row.message,
      read: row.read,
      createdAt: row.createdAt,
    })
  }
}
