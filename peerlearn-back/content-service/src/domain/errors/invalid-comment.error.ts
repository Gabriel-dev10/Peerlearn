export class InvalidCommentError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidCommentError'
  }
}
