import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateTrailUseCase } from '../../application/use-cases/create-trail.use-case'
import { ListTrailsUseCase } from '../../application/use-cases/list-trails.use-case'
import { CreateTrailDto } from './dtos/create-trail.dto'

@ApiTags('trails')
@Controller('trails')
export class TrailController {
  constructor(
    private readonly createTrailUseCase: CreateTrailUseCase,
    private readonly listTrailsUseCase: ListTrailsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma trilha de conhecimento' })
  @ApiResponse({ status: 201, description: 'Trilha criada' })
  @ApiResponse({ status: 400, description: 'Dados de trilha inválidos' })
  create(@Body() dto: CreateTrailDto) {
    return this.createTrailUseCase.execute(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Lista as trilhas' })
  @ApiResponse({ status: 200, description: 'Lista de trilhas' })
  list() {
    return this.listTrailsUseCase.execute()
  }
}
