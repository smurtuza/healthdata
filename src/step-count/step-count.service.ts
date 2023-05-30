// src/step-count/step-count.service.ts
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLatestStepCountQuery, GetStepCountQuery } from './queries/get-step-count.query';

@Injectable()
export class StepCountService {
  constructor(private readonly queryBus: QueryBus) {}

  async getStepCount(query: GetStepCountQuery): Promise<any> {
    return this.queryBus.execute(query);
  }

  async getLatestStepCount(query: GetLatestStepCountQuery): Promise<any> {
    return this.queryBus.execute(query);
  }

}
