import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ListNotificationsUseCase } from '../../application/use-cases/list-notifications.use-case'

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly listNotificationsUseCase: ListNotificationsUseCase,
  ) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Lista as notificações de um usuário' })
  @ApiResponse({ status: 200, description: 'Lista de notificações' })
  listByUser(@Param('userId') userId: string) {
    return this.listNotificationsUseCase.execute(userId)
  }
}
