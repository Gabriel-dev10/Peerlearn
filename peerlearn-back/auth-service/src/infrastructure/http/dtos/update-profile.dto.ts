import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'João Silva', minLength: 2 })
  @IsOptional()
  @IsString()
  @MinLength(2)
  displayName?: string

  @ApiPropertyOptional({ example: 'Estudante de sistemas distribuídos' })
  @IsOptional()
  @IsString()
  bio?: string
}
