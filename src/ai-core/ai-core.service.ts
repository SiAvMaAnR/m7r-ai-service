import { Injectable } from '@nestjs/common';
import { CreateCompletionDto } from './dto/create-completion.dto';
import {
  AIModelInstanceMap,
  modelMapper,
} from './integrations/ai-manager.model-mapper';
import { AIManager, IAIModel } from './integrations/ai-manager';

@Injectable()
export class AiCoreService {
  public constructor() {}

  async createCompletion(createCompletionDto: CreateCompletionDto) {
    const { message, apiKey, messages, temperature } = createCompletionDto;

    const integration = modelMapper[
      apiKey.model
    ] as keyof typeof AIModelInstanceMap;

    const aiModel: IAIModel = new AIModelInstanceMap[integration](apiKey);

    const aiClient = new AIManager(aiModel);

    const requestMessage = {
      role: aiModel.userRole,
      content: message.content,
    };

    const responseMessage = await aiClient.createCompletion({
      messages: [...messages, requestMessage],
      temperature,
    });

    return responseMessage;
  }
}
