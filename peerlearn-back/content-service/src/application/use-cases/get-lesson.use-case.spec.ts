import { beforeEach, describe, expect, it } from 'bun:test'
import { FakeEventPublisher } from '../../../test/fake-event-publisher'
import { InMemoryLessonRepository } from '../../../test/in-memory-lesson.repository'
import { LessonNotFoundError } from '../errors/lesson-not-found.error'
import { GetLessonUseCase } from './get-lesson.use-case'
import { PublishLessonUseCase } from './publish-lesson.use-case'

describe('GetLessonUseCase', () => {
  let lessons: InMemoryLessonRepository
  let getLesson: GetLessonUseCase

  beforeEach(() => {
    lessons = new InMemoryLessonRepository()
    getLesson = new GetLessonUseCase(lessons)
  })

  it('deve retornar a aula pelo id', async () => {
    const published = await new PublishLessonUseCase(
      lessons,
      new FakeEventPublisher(),
    ).execute({
      type: 'video',
      title: 'Docker Compose',
      body: 'corpo',
      authorId: 'a-1',
    })

    const result = await getLesson.execute(published.id)
    expect(result.title).toBe('Docker Compose')
  })

  it('deve lançar erro quando a aula não existe', async () => {
    await expect(getLesson.execute('inexistente')).rejects.toBeInstanceOf(
      LessonNotFoundError,
    )
  })
})
