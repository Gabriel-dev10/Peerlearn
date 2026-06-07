import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import type { TokenPayload } from '../../application/ports/token.provider'
import { GetProfileUseCase } from '../../application/use-cases/get-profile.use-case'
import { LoginUseCase } from '../../application/use-cases/login.use-case'
import { RegisterUseCase } from '../../application/use-cases/register.use-case'
import { UpdateProfileUseCase } from '../../application/use-cases/update-profile.use-case'
import { CurrentUser } from './decorators/current-user.decorator'
import { LoginDto } from './dtos/login.dto'
import { RegisterDto } from './dtos/register.dto'
import { UpdateProfileDto } from './dtos/update-profile.dto'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado' })
  @ApiResponse({ status: 409, description: 'Email já está em uso' })
  register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto)
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Autentica e retorna um token JWT' })
  @ApiResponse({ status: 200, description: 'Token JWT emitido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retorna o perfil do usuário autenticado' })
  me(@CurrentUser() user: TokenPayload) {
    return this.getProfileUseCase.execute(user.sub)
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza o perfil do usuário autenticado' })
  updateMe(@CurrentUser() user: TokenPayload, @Body() dto: UpdateProfileDto) {
    return this.updateProfileUseCase.execute({
      userId: user.sub,
      displayName: dto.displayName,
      bio: dto.bio,
    })
  }
}
