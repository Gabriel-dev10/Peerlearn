import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ReputationModule } from './infrastructure/reputation.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ReputationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
