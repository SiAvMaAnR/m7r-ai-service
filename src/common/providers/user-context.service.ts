import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ACCOUNT_ID_HEADER, ACCOUNT_ROLE_HEADER } from '../common.constants';

@Injectable({ scope: Scope.REQUEST })
export class AccContextService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getId(): number | null {
    const accountId = this.request.headers?.[ACCOUNT_ID_HEADER];

    if (Array.isArray(accountId)) {
      return null;
    }

    return Number(accountId) || null;
  }

  getRole(): string | null {
    const accountRole = this.request.headers?.[ACCOUNT_ROLE_HEADER];

    if (Array.isArray(accountRole)) {
      return null;
    }

    return accountRole || null;
  }
}
