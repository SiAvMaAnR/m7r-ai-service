import { AIModelEnum } from 'src/ai-core/integrations/ai-client.types';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  apiKey: string;

  @IsOptional()
  @IsString()
  additionalKey?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature: number;

  @IsOptional()
  @IsString()
  template?: string;

  @IsEnum(AIModelEnum)
  model: AIModelEnum;
}
