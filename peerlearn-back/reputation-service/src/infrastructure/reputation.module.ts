import { Module } from '@nestjs/common'
import { AwardXpUseCase } from '../application/use-cases/award-xp.use-case'
import { GetRankingUseCase } from '../application/use-cases/get-ranking.use-case'
import { GetReputationUseCase } from '../application/use-cases/get-reputation.use-case'
import {
  type IScoreRepository,
  SCORE_REPOSITORY,
} from '../domain/repositories/score.repository'
import { XpStrategyResolver } from '../domain/strategies/xp-strategy.resolver'
import { PrismaScoreRepository } from './database/prisma-score.repository'
import { PrismaService } from './database/prisma.service'
import { ReputationController } from './http/reputation.controller'

@Module({
  controllers: [ReputationController],
  providers: [
    PrismaService,
    XpStrategyResolver,
    { provide: SCORE_REPOSITORY, useClass: PrismaScoreRepository },
    {
      provide: AwardXpUseCase,
      inject: [XpStrategyResolver, SCORE_REPOSITORY],
      useFactory: (resolver: XpStrategyResolver, scores: IScoreRepository) =>
        new AwardXpUseCase(resolver, scores),
    },
    {
      provide: GetRankingUseCase,
      inject: [SCORE_REPOSITORY],
      useFactory: (scores: IScoreRepository) => new GetRankingUseCase(scores),
    },
    {
      provide: GetReputationUseCase,
      inject: [SCORE_REPOSITORY],
      useFactory: (scores: IScoreRepository) =>
        new GetReputationUseCase(scores),
    },
  ],
})
export class ReputationModule {}
