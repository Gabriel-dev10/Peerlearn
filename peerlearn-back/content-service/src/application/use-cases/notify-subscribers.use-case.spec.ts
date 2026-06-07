import { beforeEach, describe, expect, it } from 'bun:test'
import { InMemoryNotificationRepository } from '../../../test/in-memory-notification.repository'
import { StubSubscriberProvider } from '../../../test/stub-subscriber.provider'
import { NotifySubscribersUseCase } from './notify-subscribers.use-case'

describe('NotifySubscribersUseCase', () => {
  let notifications: InMemoryNotificationRepository

  beforeEach(() => {
    notifications = new InMemoryNotificationRepository()
  })

  it('deve criar uma notificação para cada inscrito (exceto o autor)', async () => {
    const useCase = new NotifySubscribersUseCase(
      notifications,
      new StubSubscriberProvider(['s1', 's2', 'autor']),
    )

    const result = await useCase.execute({
      lessonId: 'lesson-1',
      title: 'Docker Compose',
      authorId: 'autor',
      trailId: 'trail-1',
    })

    expect(result.notified).toBe(2)
    expect(await notifications.findByUserId('s1')).toHaveLength(1)
    expect(await notifications.findByUserId('autor')).toHaveLength(0)
  })
})
