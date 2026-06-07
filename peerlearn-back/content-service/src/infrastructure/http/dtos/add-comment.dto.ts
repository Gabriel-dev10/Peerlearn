import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class AddCommentDto {
  @ApiProperty({ example: 'author-uuid' })
  @IsString()
  authorId!: string

  @ApiProperty({ example: 'Aula muito boa, obrigado!' })
  @IsString()
  @MinLength(1)
  text!: string
}
