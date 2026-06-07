import { beforeEach, describe, expect, it } from 'bun:test'
import { FakeEventPublisher } from '../../../test/fake-event-publisher'
import { InMemoryLessonRepository } from '../../../test/in-memory-lesson.repository'
import { PublishLessonUseCase } from './publish-lesson.use-case'

describe('PublishLessonUseCase', () => {
  let lessons: InMemoryLessonRepository
  let events: FakeEventPublisher
  let useCase: PublishLessonUseCase

  beforeEach(() => {
    lessons = new InMemoryLessonRepository()
    events = new FakeEventPublisher()
    useCase = new PublishLessonUseCase(lessons, events)
  })

  it('deve publicar uma micro-aula e salvá-la', async () => {
    const result = await useCase.execute({
      type: 'video',
      title: 'Docker Compose',
      body: 'Como orquestrar containers',
      authorId: 'author-1',
    })

    expect(result.id).toBeDefined()
    expect(result.type).toBe('video')
    expect(lessons.items).toHaveLength(1)
  })

  it('deve emitir o evento lesson.published ao publicar', async () => {
    const result = await useCase.execute({
      type: 'text',
      title: 'Clean Architecture',
      body: 'Camadas e dependências',
      authorId: 'author-1',
      trailId: 'trail-1',
    })

    expect(events.published).toHaveLength(1)
    const event = events.published[0]
    expect(event.routingKey).toBe('lesson.published')
    expect(event.payload).toMatchObject({
      lessonId: result.id,
      authorId: 'author-1',
      title: 'Clean Architecture',
      trailId: 'trail-1',
    })
  })
})
