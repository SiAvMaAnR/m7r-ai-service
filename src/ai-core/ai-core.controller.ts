import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AiCoreService } from './ai-core.service';
import { CreateCompletionDto } from './dto/create-completion.dto';

@Controller()
export class AiCoreController {
  constructor(private readonly aiCoreService: AiCoreService) {}

  @MessagePattern('create-message')
  async createMessage(createCompletionDto: CreateCompletionDto) {
    return this.aiCoreService.createCompletion(createCompletionDto);
  }
}
