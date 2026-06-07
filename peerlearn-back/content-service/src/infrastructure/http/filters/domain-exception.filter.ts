import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { LessonNotFoundError } from '../../../application/errors/lesson-not-found.error'
import { InvalidCommentError } from '../../../domain/errors/invalid-comment.error'
import { InvalidContentError } from '../../../domain/errors/invalid-content.error'
import { InvalidTrailError } from '../../../domain/errors/invalid-trail.error'

@Catch(
  InvalidContentError,
  InvalidTrailError,
  InvalidCommentError,
  LessonNotFoundError,
)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse()
    const status =
      exception instanceof LessonNotFoundError
        ? HttpStatus.NOT_FOUND
        : HttpStatus.BAD_REQUEST

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.name,
    })
  }
}
