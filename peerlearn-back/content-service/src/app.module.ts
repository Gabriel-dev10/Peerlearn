import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ContentModule } from './infrastructure/content.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
