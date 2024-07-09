import { Body, Controller, Post } from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices';
import { AiCoreService } from './ai-core.service';
import { CreateCompletionDto } from './dto/create-completion.dto';

@Controller()
export class AiCoreController {
  constructor(private readonly aiCoreService: AiCoreService) {}

  @Post('create-message') // =================================================== temp
  // @MessagePattern('create-message')
  async createMessage(@Body() createCompletionDto: CreateCompletionDto) {
    return this.aiCoreService.createCompletion(createCompletionDto);
  }
}
