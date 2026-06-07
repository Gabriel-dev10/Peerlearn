export class LessonNotFoundError extends Error {
  constructor(lessonId: string) {
    super(`Aula não encontrada: ${lessonId}`)
    this.name = 'LessonNotFoundError'
  }
}
