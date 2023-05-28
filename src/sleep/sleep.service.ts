// src/sleep/sleep.service.ts
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetSleepQuery } from './queries/get-sleep.query';

@Injectable()
export class SleepService {
  constructor(private readonly queryBus: QueryBus) {}

  async getSleep(query: GetSleepQuery): Promise<any> {
    return this.queryBus.execute(query);
  }
}
