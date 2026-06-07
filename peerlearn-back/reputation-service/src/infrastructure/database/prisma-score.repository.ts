import { Injectable } from '@nestjs/common'
import type {
  IScoreRepository,
  RankingEntry,
} from '../../domain/repositories/score.repository'
import { PrismaService } from './prisma.service'

@Injectable()
export class PrismaScoreRepository implements IScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getXp(userId: string): Promise<number> {
    const score = await this.prisma.score.findUnique({ where: { userId } })
    return score?.xp ?? 0
  }

  async addXp(userId: string, amount: number): Promise<number> {
    const score = await this.prisma.score.upsert({
      where: { userId },
      create: { userId, xp: amount },
      update: { xp: { increment: amount } },
    })
    return score.xp
  }

  async top(limit: number): Promise<RankingEntry[]> {
    const rows = await this.prisma.score.findMany({
      orderBy: { xp: 'desc' },
      take: limit,
    })
    return rows.map((row) => ({ userId: row.userId, xp: row.xp }))
  }
}
