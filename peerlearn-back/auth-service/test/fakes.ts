import type { IHashProvider } from '../src/application/ports/hash.provider'
import type {
  ITokenProvider,
  TokenPayload,
} from '../src/application/ports/token.provider'

export class FakeHashProvider implements IHashProvider {
  async hash(plain: string): Promise<string> {
    return `hashed:${plain}`
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return hashed === `hashed:${plain}`
  }
}

export class FakeTokenProvider implements ITokenProvider {
  sign(payload: TokenPayload): string {
    return `token-for-${payload.sub}`
  }
}
