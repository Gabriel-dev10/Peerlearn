import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type {
  ITokenProvider,
  TokenPayload,
} from '../../application/ports/token.provider'

@Injectable()
export class JwtTokenProvider implements ITokenProvider {
  constructor(private readonly jwt: JwtService) {}

  sign(payload: TokenPayload): string {
    return this.jwt.sign(payload)
  }
}
