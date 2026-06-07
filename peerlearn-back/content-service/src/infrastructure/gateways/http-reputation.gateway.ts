import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { IReputationGateway } from '../../application/ports/reputation.gateway'

@Injectable()
export class HttpReputationGateway implements IReputationGateway {
  private readonly logger = new Logger(HttpReputationGateway.name)

  constructor(private readonly config: ConfigService) {}

  async awardLessonPublished(authorId: string): Promise<void> {
    const baseUrl = this.config.get<string>(
      'REPUTATION_SERVICE_URL',
      'http://localhost:3004',
    )

    try {
      await fetch(`${baseUrl}/xp`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userId: authorId, action: 'publish_lesson' }),
      })
    } catch (error) {
      this.logger.warn(
        `Não foi possível conceder XP a ${authorId}: ${String(error)}`,
      )
    }
  }
}
