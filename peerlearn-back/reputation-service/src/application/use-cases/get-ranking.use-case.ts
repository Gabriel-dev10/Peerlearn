import type {
  IScoreRepository,
  RankingEntry,
} from '../../domain/repositories/score.repository'

export class GetRankingUseCase {
  constructor(private readonly scores: IScoreRepository) {}

  execute(limit = 10): Promise<RankingEntry[]> {
    return this.scores.top(limit)
  }
}
