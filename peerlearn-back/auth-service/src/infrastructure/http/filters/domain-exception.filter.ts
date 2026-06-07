import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { EmailAlreadyInUseError } from '../../../application/errors/email-already-in-use.error'
import { InvalidCredentialsError } from '../../../application/errors/invalid-credentials.error'
import { UserNotFoundError } from '../../../application/errors/user-not-found.error'
import { InvalidEmailError } from '../../../domain/errors/invalid-email.error'
import { InvalidProfileError } from '../../../domain/errors/invalid-profile.error'

@Catch(
  EmailAlreadyInUseError,
  InvalidCredentialsError,
  UserNotFoundError,
  InvalidEmailError,
  InvalidProfileError,
)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse()
    const status = this.resolveStatus(exception)

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.name,
    })
  }

  private resolveStatus(exception: Error): number {
    if (exception instanceof EmailAlreadyInUseError) {
      return HttpStatus.CONFLICT
    }
    if (exception instanceof InvalidCredentialsError) {
      return HttpStatus.UNAUTHORIZED
    }
    if (exception instanceof UserNotFoundError) {
      return HttpStatus.NOT_FOUND
    }
    return HttpStatus.BAD_REQUEST
  }
}
