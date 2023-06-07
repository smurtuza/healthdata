// src/sleep/sleep.service.ts
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLatestSleepQuery, GetSleepQuery } from './queries/get-sleep.query';

@Injectable()
export class SleepService {
  constructor(private readonly queryBus: QueryBus) {}

  async getSleep(query: GetSleepQuery): Promise<any> {
    return this.queryBus.execute(query);
  }
  async getLatestSleep(query: GetLatestSleepQuery): Promise<any> {
    return this.queryBus.execute(query);
  }
}
