import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { TokenPayload } from '../../../application/ports/token.provider'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const authorization: string | undefined = request.headers.authorization

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de autenticação ausente')
    }

    try {
      const payload = this.jwt.verify<TokenPayload>(authorization.slice(7))
      request.user = payload
      return true
    } catch {
      throw new UnauthorizedException('Token de autenticação inválido')
    }
  }
}
