export const SCORE_REPOSITORY = Symbol('SCORE_REPOSITORY')

export interface RankingEntry {
  userId: string
  xp: number
}

export interface IScoreRepository {
  getXp(userId: string): Promise<number>
  addXp(userId: string, amount: number): Promise<number>
  top(limit: number): Promise<RankingEntry[]>
}
