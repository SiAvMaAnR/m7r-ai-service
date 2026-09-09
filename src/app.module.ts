import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AiCoreModule } from './ai-core/ai-core.module';
import { TimerMiddleware } from './common/middlewares/timer.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/app.config';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMFactory } from './config/typeorm.config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ProfilesModule,
    AiCoreModule,
    HealthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeORMFactory,
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TimerMiddleware).forRoutes('*');
  }
}
