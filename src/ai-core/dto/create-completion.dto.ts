import { MessageT } from '../integrations/ai-client.types';
import { IsArray, IsInt, IsOptional, Min } from 'class-validator';

export class CreateCompletionDto {
  @IsInt()
  profileId: number;

  @IsInt()
  channelId: number;

  @IsArray()
  messages: Array<MessageT>;

  @IsOptional()
  @IsInt()
  originalMessageId?: number;
}

export class CreateCompletionEventDto extends CreateCompletionDto {
  @IsInt()
  @Min(1)
  accountId: number;
}
