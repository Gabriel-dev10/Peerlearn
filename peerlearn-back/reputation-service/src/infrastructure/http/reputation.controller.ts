import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AwardXpUseCase } from '../../application/use-cases/award-xp.use-case'
import { GetRankingUseCase } from '../../application/use-cases/get-ranking.use-case'
import { GetReputationUseCase } from '../../application/use-cases/get-reputation.use-case'
import { AwardXpDto } from './dtos/award-xp.dto'

@ApiTags('reputation')
@Controller()
export class ReputationController {
  constructor(
    private readonly awardXpUseCase: AwardXpUseCase,
    private readonly getRankingUseCase: GetRankingUseCase,
    private readonly getReputationUseCase: GetReputationUseCase,
  ) {}

  @Post('xp')
  @ApiOperation({ summary: 'Concede XP a um usuário por uma ação (Strategy)' })
  @ApiResponse({ status: 201, description: 'XP concedido' })
  @ApiResponse({ status: 400, description: 'Ação de XP desconhecida' })
  awardXp(@Body() dto: AwardXpDto) {
    return this.awardXpUseCase.execute(dto)
  }

  @Get('ranking')
  @ApiOperation({ summary: 'Retorna o ranking de XP' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Ranking de usuários por XP' })
  ranking(@Query('limit') limit?: string) {
    return this.getRankingUseCase.execute(limit ? Number(limit) : 10)
  }

  @Get('reputation/:userId')
  @ApiOperation({
    summary: 'Retorna XP e badges do usuário (nome decorado — Decorator)',
  })
  @ApiQuery({ name: 'name', required: false, example: 'Maria' })
  @ApiResponse({ status: 200, description: 'Reputação do usuário' })
  reputation(@Param('userId') userId: string, @Query('name') name?: string) {
    return this.getReputationUseCase.execute(userId, name ?? 'Aluno')
  }
}
