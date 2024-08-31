import { Body, Controller, Post } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { CustomEventPattern } from '../common/common.decorators';

@Controller('api/ai-core')
export class AiCoreController {
  constructor(private readonly aiCoreService: AiCoreService) {}

  @CustomEventPattern('create-message')
  async createMessage(createCompletionDto: CreateCompletionDto) {
    return this.aiCoreService.createCompletion(createCompletionDto);
  }

  @Post('create-message')
  async createMessageRest(@Body() createCompletionDto: CreateCompletionDto) {
    return this.aiCoreService.createCompletion(createCompletionDto);
  }
}
