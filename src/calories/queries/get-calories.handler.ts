// src/step-count/queries/get-step-count.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetCaloriesQuery, GetLatestCaloriesQuery } from './get-calories.query';

@QueryHandler(GetCaloriesQuery)
export class GetCaloriesHandler implements IQueryHandler<GetCaloriesQuery> {
  constructor(
    @InjectModel('Calories') private readonly caloriesModel: Model<any>,
  ) {}

  async execute(query: GetCaloriesQuery): Promise<any> {
    const { userId, startDate, endDate, source, page, limit } = query;

    const filter: any = {
      userId,
    };

    if (startDate) {
      filter.date = { $gte: startDate };
    }

    if (endDate) {
      filter.date = { ...filter.date, $lte: endDate };
    }

    if (source) {
      filter.source = source;
    }

    const queryBuilder = this.caloriesModel
      .find(filter)
      .sort({ date: 'asc' });

    if (page && limit) {
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).limit(limit);
    }

    return queryBuilder.exec();
  }
}

@QueryHandler(GetLatestCaloriesQuery)
export class GetLatestCaloriesHandler implements IQueryHandler<GetLatestCaloriesQuery> {
  constructor(
    @InjectModel('Calories')
    private readonly caloriesModel: Model<any>,
  ) {}

  async execute(query: GetLatestCaloriesQuery): Promise<any> {
    const { userId } = query;

    const stepCount = await this.caloriesModel
      .findOne({ userId })
      .sort({ endDate: 'desc' })
      .exec();

    return stepCount;
  }
}
