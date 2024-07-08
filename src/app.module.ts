import { Module } from '@nestjs/common';
import { AiCoreModule } from './ai-core/ai-core.module';

@Module({
  imports: [AiCoreModule],
})
export class AppModule {}
