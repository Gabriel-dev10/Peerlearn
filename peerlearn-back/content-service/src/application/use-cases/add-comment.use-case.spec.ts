import { beforeEach, describe, expect, it } from 'bun:test'
import { FakeEventPublisher } from '../../../test/fake-event-publisher'
import { InMemoryCommentRepository } from '../../../test/in-memory-comment.repository'
import { InMemoryLessonRepository } from '../../../test/in-memory-lesson.repository'
import { LessonNotFoundError } from '../errors/lesson-not-found.error'
import { AddCommentUseCase } from './add-comment.use-case'
import { PublishLessonUseCase } from './publish-lesson.use-case'

describe('AddCommentUseCase', () => {
  let comments: InMemoryCommentRepository
  let lessons: InMemoryLessonRepository
  let useCase: AddCommentUseCase

  beforeEach(() => {
    comments = new InMemoryCommentRepository()
    lessons = new InMemoryLessonRepository()
    useCase = new AddCommentUseCase(comments, lessons)
  })

  it('deve adicionar um comentário a uma aula existente', async () => {
    const lesson = await new PublishLessonUseCase(
      lessons,
      new FakeEventPublisher(),
    ).execute({
      type: 'text',
      title: 'Clean Code',
      body: 'corpo',
      authorId: 'a-1',
    })

    const result = await useCase.execute({
      lessonId: lesson.id,
      authorId: 'aluno-2',
      text: 'Excelente aula!',
    })

    expect(result.text).toBe('Excelente aula!')
    expect(comments.items).toHaveLength(1)
  })

  it('deve lançar erro ao comentar em aula inexistente', async () => {
    await expect(
      useCase.execute({
        lessonId: 'inexistente',
        authorId: 'aluno-2',
        text: 'Oi',
      }),
    ).rejects.toBeInstanceOf(LessonNotFoundError)
  })
})
