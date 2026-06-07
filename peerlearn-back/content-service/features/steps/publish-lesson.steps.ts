import assert from 'node:assert'
import { Given, Then, When } from '@cucumber/cucumber'
import { NotifySubscribersUseCase } from '../../src/application/use-cases/notify-subscribers.use-case'
import {
  LESSON_PUBLISHED,
  type LessonPublishedPayload,
  PublishLessonUseCase,
} from '../../src/application/use-cases/publish-lesson.use-case'
import { InMemoryLessonRepository } from '../../test/in-memory-lesson.repository'
import { InMemoryNotificationRepository } from '../../test/in-memory-notification.repository'
import { InProcessEventBus } from '../../test/in-process-event-bus'
import { StubSubscriberProvider } from '../../test/stub-subscriber.provider'

let notifications: InMemoryNotificationRepository
let publishLesson: PublishLessonUseCase
let authorId: string

Given(
  'que os alunos inscritos são {string} e o autor é {string}',
  (subscribersCsv: string, author: string) => {
    authorId = author
    notifications = new InMemoryNotificationRepository()
    const lessons = new InMemoryLessonRepository()
    const bus = new InProcessEventBus()

    const notify = new NotifySubscribersUseCase(
      notifications,
      new StubSubscriberProvider([...subscribersCsv.split(','), author]),
    )
    bus.on(LESSON_PUBLISHED, (payload) =>
      notify.execute(payload as LessonPublishedPayload),
    )

    publishLesson = new PublishLessonUseCase(lessons, bus)
  },
)

When('o autor publica uma micro-aula {string}', async (title: string) => {
  await publishLesson.execute({
    type: 'video',
    title,
    body: 'conteúdo da aula',
    authorId,
  })
})

Then('os alunos {string} recebem uma notificação', async (csv: string) => {
  for (const userId of csv.split(',')) {
    const userNotifications = await notifications.findByUserId(userId)
    assert.strictEqual(userNotifications.length, 1)
  }
})

Then('o autor não recebe notificação', async () => {
  const authorNotifications = await notifications.findByUserId(authorId)
  assert.strictEqual(authorNotifications.length, 0)
})
