import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomEventPatternInterceptor } from './interceptors/custom-event-pattern.interceptor';

export function CustomEventPattern(pattern: string) {
  return applyDecorators(
    MessagePattern(pattern),
    UseInterceptors(new CustomEventPatternInterceptor()),
  );
}
