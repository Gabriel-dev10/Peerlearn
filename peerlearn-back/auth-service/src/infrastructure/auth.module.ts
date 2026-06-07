import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import {
  HASH_PROVIDER,
  type IHashProvider,
} from '../application/ports/hash.provider'
import {
  type ITokenProvider,
  TOKEN_PROVIDER,
} from '../application/ports/token.provider'
import { GetProfileUseCase } from '../application/use-cases/get-profile.use-case'
import { LoginUseCase } from '../application/use-cases/login.use-case'
import { RegisterUseCase } from '../application/use-cases/register.use-case'
import { UpdateProfileUseCase } from '../application/use-cases/update-profile.use-case'
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../domain/repositories/user.repository'
import { PrismaUserRepository } from './database/prisma-user.repository'
import { PrismaService } from './database/prisma.service'
import { AuthController } from './http/auth.controller'
import { JwtAuthGuard } from './http/guards/jwt-auth.guard'
import { RolesGuard } from './http/guards/roles.guard'
import { BcryptHashProvider } from './providers/bcrypt-hash.provider'
import { JwtTokenProvider } from './providers/jwt-token.provider'

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN', '7d') },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: HASH_PROVIDER, useClass: BcryptHashProvider },
    { provide: TOKEN_PROVIDER, useClass: JwtTokenProvider },
    {
      provide: RegisterUseCase,
      inject: [USER_REPOSITORY, HASH_PROVIDER],
      useFactory: (users: IUserRepository, hasher: IHashProvider) =>
        new RegisterUseCase(users, hasher),
    },
    {
      provide: LoginUseCase,
      inject: [USER_REPOSITORY, HASH_PROVIDER, TOKEN_PROVIDER],
      useFactory: (
        users: IUserRepository,
        hasher: IHashProvider,
        tokens: ITokenProvider,
      ) => new LoginUseCase(users, hasher, tokens),
    },
    {
      provide: GetProfileUseCase,
      inject: [USER_REPOSITORY],
      useFactory: (users: IUserRepository) => new GetProfileUseCase(users),
    },
    {
      provide: UpdateProfileUseCase,
      inject: [USER_REPOSITORY],
      useFactory: (users: IUserRepository) => new UpdateProfileUseCase(users),
    },
    JwtAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}
