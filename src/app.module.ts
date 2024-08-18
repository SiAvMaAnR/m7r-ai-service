import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AiCoreModule } from './ai-core/ai-core.module';
import { TimerMiddleware } from './common/middlewares/timer.middleware';

@Module({
  imports: [AiCoreModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimerMiddleware).forRoutes('*');
  }
}
