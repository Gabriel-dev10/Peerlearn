import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator'
import type { ContentType } from '../../../domain/entities/content.entity'

export class PublishLessonDto {
  @ApiProperty({ enum: ['video', 'text', 'quiz'], example: 'video' })
  @IsIn(['video', 'text', 'quiz'])
  type!: ContentType

  @ApiProperty({ example: 'Docker Compose', minLength: 3 })
  @IsString()
  @MinLength(3)
  title!: string

  @ApiProperty({ example: 'Como orquestrar containers com docker-compose' })
  @IsString()
  body!: string

  @ApiProperty({ example: 'author-uuid' })
  @IsString()
  authorId!: string

  @ApiPropertyOptional({ example: 'trail-uuid' })
  @IsOptional()
  @IsString()
  trailId?: string
}
