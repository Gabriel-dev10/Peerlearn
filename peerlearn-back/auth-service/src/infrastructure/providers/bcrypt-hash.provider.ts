import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import type { IHashProvider } from '../../application/ports/hash.provider'

@Injectable()
export class BcryptHashProvider implements IHashProvider {
  private readonly rounds = 10

  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds)
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed)
  }
}
