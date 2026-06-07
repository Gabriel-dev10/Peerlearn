import type {
  IScoreRepository,
  RankingEntry,
} from '../src/domain/repositories/score.repository'

export class InMemoryScoreRepository implements IScoreRepository {
  private readonly scores = new Map<string, number>()

  async getXp(userId: string): Promise<number> {
    return this.scores.get(userId) ?? 0
  }

  async addXp(userId: string, amount: number): Promise<number> {
    const total = (this.scores.get(userId) ?? 0) + amount
    this.scores.set(userId, total)
    return total
  }

  async top(limit: number): Promise<RankingEntry[]> {
    return [...this.scores.entries()]
      .map(([userId, xp]) => ({ userId, xp }))
      .sort((a, b) => b.xp - a.xp)
      .slice(0, limit)
  }
}
