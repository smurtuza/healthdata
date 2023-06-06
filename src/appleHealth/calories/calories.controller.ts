import { Body, Controller, Get, Injectable, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppleHealthQtDto } from '../dto/apple-health-qt.dto';
import { RecordAppleHealthQtDto } from '../dto/record-apple-health-qt.dto';


import { RecordAppleHealthQtCommand } from '../commands/record-apple-health-qt.command';

import { GetAppleHealthQtQuery, GetLatestAppleHealthQtQuery } from '../queries/get-apple-health-qt.query';
import { AppleHealthQtService } from '../apple-health-qt.service';
import { CaloriesModule } from './calories.module';


@ApiTags('calories')
@Controller('calories')
export class CaloriesController {
  constructor(
    @InjectModel('Calories')
    private readonly caloriesModel: Model<any>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly caloriesService: AppleHealthQtService,
  ) {}

  @ApiBody({ type: AppleHealthQtDto, description: 'Calories Burnt Data',isArray:true })
  @Post()
  async recordStepCount(@Body(ValidationPipe) body: RecordAppleHealthQtDto): Promise<void> {
    const {userId, data} = body
    const command = new RecordAppleHealthQtCommand(userId, data,this.caloriesModel);
    await this.commandBus.execute(command);
  }

  @ApiOperation({ summary: 'Get Calories Burnt data' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'source', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getCalories(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('source') source: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    const query = new GetAppleHealthQtQuery(this.caloriesModel ,userId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined, source, page, limit);
    return this.caloriesService.getAppleHealthQt(query);
  }


  @ApiOperation({ summary: 'Get latest calories burnt data' })
  @ApiQuery({ name: 'userId', required: true })
  @Get('/latest')
  async getLatestCalories(
    @Query('userId') userId: string,
  ): Promise<any> {
    const query = new GetLatestAppleHealthQtQuery(this.caloriesModel,userId);
    return this.caloriesService.getLatestAppleHealthQt(query);
  }

}
