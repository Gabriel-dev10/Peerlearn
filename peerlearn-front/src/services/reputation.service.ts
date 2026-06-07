import type { RankingEntry, Reputation } from '../types'
import { reputationApi } from './http'

export const reputationService = {
  async getRanking(limit = 10): Promise<RankingEntry[]> {
    const { data } = await reputationApi.get<RankingEntry[]>('/ranking', {
      params: { limit },
    })
    return data
  },

  async getReputation(userId: string, name: string): Promise<Reputation> {
    const { data } = await reputationApi.get<Reputation>(
      `/reputation/${userId}`,
      { params: { name } },
    )
    return data
  },
}
