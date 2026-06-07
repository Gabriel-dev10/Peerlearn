import { beforeEach, describe, expect, it } from 'bun:test'
import { FakeEventPublisher } from '../../../test/fake-event-publisher'
import { InMemoryLessonRepository } from '../../../test/in-memory-lesson.repository'
import { ListLessonsUseCase } from './list-lessons.use-case'
import { PublishLessonUseCase } from './publish-lesson.use-case'

describe('ListLessonsUseCase', () => {
  let lessons: InMemoryLessonRepository
  let listLessons: ListLessonsUseCase

  beforeEach(() => {
    lessons = new InMemoryLessonRepository()
    listLessons = new ListLessonsUseCase(lessons)
  })

  it('deve retornar lista vazia quando não há aulas', async () => {
    expect(await listLessons.execute()).toHaveLength(0)
  })

  it('deve listar as aulas publicadas', async () => {
    const publish = new PublishLessonUseCase(lessons, new FakeEventPublisher())
    await publish.execute({
      type: 'video',
      title: 'Docker Compose',
      body: 'corpo',
      authorId: 'a-1',
    })

    const result = await listLessons.execute()
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Docker Compose')
  })
})
