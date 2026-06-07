import { type ExecutionContext, createParamDecorator } from '@nestjs/common'
import type { TokenPayload } from '../../../application/ports/token.provider'

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TokenPayload => {
    return ctx.switchToHttp().getRequest().user
  },
)
