import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomEventPatternInterceptor } from './interceptors/custom-event-pattern.interceptor';
import { EVENT_VALIDATION_OPTIONS } from './common.constants';

export function CustomEventPattern(pattern: string) {
  return applyDecorators(
    MessagePattern(pattern),
    UseInterceptors(new CustomEventPatternInterceptor()),
    UsePipes(new ValidationPipe(EVENT_VALIDATION_OPTIONS)),
  );
}

export const ReqUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
