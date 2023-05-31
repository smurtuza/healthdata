// src/step-count/step-count.service.ts
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAppleHealthQtQuery, GetLatestAppleHealthQtQuery } from './queries/get-apple-health-qt.query';

@Injectable()
export class AppleHealthQtService {
  constructor(private readonly queryBus: QueryBus) {}

  async getAppleHealthQt(query: GetAppleHealthQtQuery): Promise<any> {
    return this.queryBus.execute(query);
  }

  async getLatestAppleHealthQt(query: GetLatestAppleHealthQtQuery): Promise<any> {
    return this.queryBus.execute(query);
  }

}
