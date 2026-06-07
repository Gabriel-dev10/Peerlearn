import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AddCommentUseCase } from '../../application/use-cases/add-comment.use-case'
import { GetLessonUseCase } from '../../application/use-cases/get-lesson.use-case'
import { ListCommentsUseCase } from '../../application/use-cases/list-comments.use-case'
import { ListLessonsUseCase } from '../../application/use-cases/list-lessons.use-case'
import { PublishLessonUseCase } from '../../application/use-cases/publish-lesson.use-case'
import { AddCommentDto } from './dtos/add-comment.dto'
import { PublishLessonDto } from './dtos/publish-lesson.dto'

@ApiTags('lessons')
@Controller('lessons')
export class LessonController {
  constructor(
    private readonly publishLessonUseCase: PublishLessonUseCase,
    private readonly listLessonsUseCase: ListLessonsUseCase,
    private readonly getLessonUseCase: GetLessonUseCase,
    private readonly addCommentUseCase: AddCommentUseCase,
    private readonly listCommentsUseCase: ListCommentsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Publica uma nova micro-aula' })
  @ApiResponse({ status: 201, description: 'Aula publicada' })
  @ApiResponse({ status: 400, description: 'Dados de conteúdo inválidos' })
  publish(@Body() dto: PublishLessonDto) {
    return this.publishLessonUseCase.execute(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Lista as micro-aulas publicadas' })
  @ApiResponse({ status: 200, description: 'Lista de aulas' })
  list() {
    return this.listLessonsUseCase.execute()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma micro-aula pelo id' })
  @ApiResponse({ status: 200, description: 'Aula encontrada' })
  @ApiResponse({ status: 404, description: 'Aula não encontrada' })
  getById(@Param('id') id: string) {
    return this.getLessonUseCase.execute(id)
  }

  @Post(':id/comments')
  @ApiOperation({ summary: 'Adiciona um comentário a uma aula' })
  @ApiResponse({ status: 201, description: 'Comentário criado' })
  @ApiResponse({ status: 404, description: 'Aula não encontrada' })
  addComment(@Param('id') lessonId: string, @Body() dto: AddCommentDto) {
    return this.addCommentUseCase.execute({ lessonId, ...dto })
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Lista os comentários de uma aula' })
  @ApiResponse({ status: 200, description: 'Lista de comentários' })
  listComments(@Param('id') lessonId: string) {
    return this.listCommentsUseCase.execute(lessonId)
  }
}
