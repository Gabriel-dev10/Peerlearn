import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @ApiProperty({ example: 'joao@uni.edu' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'senha123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string

  @ApiProperty({ example: 'João Silva', minLength: 2 })
  @IsString()
  @MinLength(2)
  displayName!: string
}
