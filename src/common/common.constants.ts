import { ValidationPipeOptions } from '@nestjs/common';

export const ACCOUNT_ID_HEADER = 'x-account-id';
export const ACCOUNT_ROLE_HEADER = 'x-account-role';

export const REST_VALIDATION_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};

export const EVENT_VALIDATION_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
};
