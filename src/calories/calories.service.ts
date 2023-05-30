// src/step-count/step-count.service.ts
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLatestCaloriesQuery, GetCaloriesQuery } from './queries/get-calories.query';

@Injectable()
export class CaloriesService {
  constructor(private readonly queryBus: QueryBus) {}

  async getCalories(query: GetCaloriesQuery): Promise<any> {
    return this.queryBus.execute(query);
  }

  async getLatestCalories(query: GetLatestCaloriesQuery): Promise<any> {
    return this.queryBus.execute(query);
  }

}
