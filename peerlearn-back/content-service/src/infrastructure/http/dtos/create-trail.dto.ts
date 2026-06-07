import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateTrailDto {
  @ApiProperty({ example: 'DevOps na prática', minLength: 3 })
  @IsString()
  @MinLength(3)
  title!: string

  @ApiProperty({ example: 'Trilha sobre Docker, CI/CD e deploy' })
  @IsString()
  description!: string

  @ApiProperty({ example: 'owner-uuid' })
  @IsString()
  ownerId!: string
}
