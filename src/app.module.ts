import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AiCoreModule } from './ai-core/ai-core.module';
import { TimerMiddleware } from './common/middlewares/timer.middleware';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/app.config';

@Module({
  imports: [
    AiCoreModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimerMiddleware).forRoutes('*');
  }
}
