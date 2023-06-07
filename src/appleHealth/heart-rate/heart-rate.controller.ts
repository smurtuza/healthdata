// src/step-count/step-count.controller.ts
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

@ApiTags('heartRate')
@Controller('heart-rate')
export class HeartRateController {
  constructor(
    @InjectModel('HearRate')
    private readonly heartRateModel: Model<any>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly hearRateService: AppleHealthQtService,
  ) {}

  @ApiBody({ type: AppleHealthQtDto, description: 'Calories Burnt Data',isArray:true })
  @Post()
  async recordOxygenSaturation(@Body() body:RecordAppleHealthQtDto ): Promise<void> {
    const appleHealthQtModel = this.heartRateModel
    const {userId, data} = body
    // const userId = 'user123'; // Replace with your authentication logic to get the user ID
    const command = new RecordAppleHealthQtCommand(userId, data,appleHealthQtModel);
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
  async getOxygenSaturation(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('source') source: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    const appleHealthQtModel = this.heartRateModel
    const query = new GetAppleHealthQtQuery(appleHealthQtModel,userId, page?page:1, limit?limit:10, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined, source);
    return this.hearRateService.getAppleHealthQt(query);
  }

  @ApiOperation({ summary: 'Get latest calories burnt data' })
  @ApiQuery({ name: 'userId', required: true })
  @Get('/latest')
  async getLatestOxygenSaturation(
    @Query('userId') userId: string,
  ): Promise<any> {
    const appleHealthQtModel = this.heartRateModel
    const query = new GetLatestAppleHealthQtQuery(appleHealthQtModel,userId);
    return this.hearRateService.getLatestAppleHealthQt(query);
  }

}
