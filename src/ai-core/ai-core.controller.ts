import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiCoreService } from './ai-core.service';
import {
  CreateCompletionDto,
  CreateCompletionEventDto,
} from './dto/create-completion.dto';
import { ApiTags } from '@nestjs/swagger';
import { MessageT } from './integrations/ai-client.types';
import { CustomEventPattern } from 'src/common/common.decorators';
import { AccountGuard } from 'src/common/guards/account.guard';
import { AccContextService } from 'src/common/providers/user-context.service';

@Controller('api/ai-core')
@ApiTags('AI-Core')
export class AiCoreController {
  constructor(
    private readonly aiCoreService: AiCoreService,
    private readonly accContextService: AccContextService,
  ) {}

  @CustomEventPattern('create-message')
  async createMessage(createCompletionEventDto: CreateCompletionEventDto) {
    const { channelId, profileId, originalMessageId, accountId } =
      createCompletionEventDto;

    const { content } = await this.aiCoreService.createCompletion(
      accountId,
      createCompletionEventDto,
    );

    return {
      message: content,
      channelId,
      profileId,
      originalMessageId,
    };
  }

  @Post('create-message')
  @UseGuards(AccountGuard)
  async createMessageRest(
    @Body() createCompletionDto: CreateCompletionDto,
  ): Promise<MessageT> {
    const accountId = this.accContextService.getId();

    return this.aiCoreService.createCompletion(accountId, createCompletionDto);
  }
}
