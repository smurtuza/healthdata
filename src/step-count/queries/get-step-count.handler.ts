// src/step-count/queries/get-step-count.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetStepCountQuery ,GetLatestStepCountQuery} from './get-step-count.query';

@QueryHandler(GetStepCountQuery)
export class GetStepCountHandler implements IQueryHandler<GetStepCountQuery> {
  constructor(
    @InjectModel('StepCount') private readonly stepCountModel: Model<any>,
  ) {}

  async execute(query: GetStepCountQuery): Promise<any> {
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

    const queryBuilder = this.stepCountModel
      .find(filter)
      .sort({ date: 'asc' });

    if (page && limit) {
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).limit(limit);
    }

    return queryBuilder.exec();
  }
}

@QueryHandler(GetLatestStepCountQuery)
export class GetLatestStepCountHandler implements IQueryHandler<GetLatestStepCountQuery> {
  constructor(
    @InjectModel('StepCount')
    private readonly stepCountModel: Model<any>,
  ) {}

  async execute(query: GetLatestStepCountQuery): Promise<any> {
    const { userId } = query;

    const stepCount = await this.stepCountModel
      .findOne({ userId })
      .sort({ date: 'desc' })
      .exec();

    return stepCount;
  }
}
