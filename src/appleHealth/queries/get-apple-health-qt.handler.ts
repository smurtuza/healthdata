// src/step-count/queries/get-step-count.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetAppleHealthQtQuery,GetLatestAppleHealthQtQuery } from './get-apple-health-qt.query';

@QueryHandler(GetAppleHealthQtQuery)
export class GetAppleHealthQtHandler implements IQueryHandler<GetAppleHealthQtQuery> {
  constructor(
    // @InjectModel('OxygenSaturation')
    // @InjectModel('HearRate') 
    // private readonly appleHealthQtModel: Model<any>,
  ) {}

  async execute(query: GetAppleHealthQtQuery): Promise<any> {
    const {appleHealthQtModel, userId, startDate, endDate, source, page, limit } = query;

    const filter: any = {
      userId,
    };

    if (startDate && endDate) {
      if (startDate) {
        filter.startDate = { $gte: startDate };
      }
      if (endDate) {
        filter.startDate = { ...filter.startDate, $lte: endDate };
      }
    }

    if (source) {
      filter.source = source;
    }

    const total = await appleHealthQtModel.countDocuments(filter);
    const data = await appleHealthQtModel
      .find(filter)
      .sort({ startDate: 'desc' })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { total,
      page,
      limit,
      data,}
  }
}

@QueryHandler(GetLatestAppleHealthQtQuery)
export class GetLatestAppleHealthHandler implements IQueryHandler<GetLatestAppleHealthQtQuery> {
  constructor(
    // @InjectModel('HearRate')
    // private readonly appleHealthQtModel: Model<any>,
  ) {}

  async execute(query: GetLatestAppleHealthQtQuery): Promise<any> {
    const { appleHealthQtModel,userId } = query;

    const stepCount = await appleHealthQtModel
      .findOne({ userId })
      .sort({ endDate: 'desc' })
      .exec();

    return stepCount;
  }
}
