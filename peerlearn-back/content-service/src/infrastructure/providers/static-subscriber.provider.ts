import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { ISubscriberProvider } from '../../application/ports/subscriber.provider'

/**
 * Implementação simples baseada em configuração (DEMO_SUBSCRIBERS).
 * Em produção consultaria as inscrições em trilhas de cada usuário.
 */
@Injectable()
export class StaticSubscriberProvider implements ISubscriberProvider {
  constructor(private readonly config: ConfigService) {}

  async getSubscribers(): Promise<string[]> {
    const raw = this.config.get<string>('DEMO_SUBSCRIBERS', '')
    return raw
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id.length > 0)
  }
}
