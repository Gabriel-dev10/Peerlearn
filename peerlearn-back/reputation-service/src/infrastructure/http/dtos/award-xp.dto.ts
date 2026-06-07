import { ApiProperty } from '@nestjs/swagger'
import { IsIn, IsString } from 'class-validator'
import type { XpAction } from '../../../domain/strategies/xp.strategy'

export class AwardXpDto {
  @ApiProperty({ example: 'user-uuid' })
  @IsString()
  userId!: string

  @ApiProperty({
    enum: ['publish_lesson', 'receive_validation', 'leave_comment'],
    example: 'publish_lesson',
  })
  @IsIn(['publish_lesson', 'receive_validation', 'leave_comment'])
  action!: XpAction
}
