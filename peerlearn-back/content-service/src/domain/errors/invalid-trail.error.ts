export class InvalidTrailError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidTrailError'
  }
}
