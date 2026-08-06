import { Injectable } from '@nestjs/common';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { AIModelInstanceMap } from './integrations/ai-client.model-mapper';
import { AIClient, IAIModel } from './integrations/ai-client';
import { MessageT } from './integrations/ai-client.types';
import { ProfilesRepository } from 'src/profiles/profiles.repository';

@Injectable()
export class AiCoreService {
  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async createCompletion(
    accountId: number,
    createCompletionDto: CreateCompletionDto,
  ): Promise<MessageT> {
    const { messages, profileId } = createCompletionDto;

    const profile = await this.profilesRepository.getOne({
      id: profileId,
      accountId,
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    const { apiKey, integration, model, temperature, template, additionalKey } =
      profile;

    const aiModel: IAIModel = new AIModelInstanceMap[integration]({
      apiKey,
      model,
      additionalKey,
    });

    const aiClient = new AIClient(aiModel);

    const responseMessage = await aiClient.createCompletion({
      messages,
      temperature,
      template,
    });

    return responseMessage;
  }
}
