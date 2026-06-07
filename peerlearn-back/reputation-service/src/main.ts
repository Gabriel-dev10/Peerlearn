import 'reflect-metadata'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { DomainExceptionFilter } from './infrastructure/http/filters/domain-exception.filter'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalFilters(new DomainExceptionFilter())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PeerLearn - Reputation Service')
    .setDescription('XP (Strategy), badges (Decorator) e ranking (Redis)')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  const port = config.get<number>('PORT', 3004)
  await app.listen(port)
  console.log(`reputation-service rodando na porta ${port} (Swagger em /docs)`)
}

void bootstrap()
