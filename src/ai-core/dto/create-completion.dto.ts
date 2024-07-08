import { ApiKeyT, MessageT } from '../integrations/ai-manager.types';

export class CreateCompletionDto {
  message: MessageT;
  temperature?: number;
  apiKey: ApiKeyT;
  messages: Array<MessageT>;
}
