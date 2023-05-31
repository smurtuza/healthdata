// src/step-count/step-count.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';

import { AppleHealthQtDto } from './dto/apple-health-qt.dto';

import { RecordAppleHealthQtCommand } from './commands/record-apple-health-qt.command';

import { GetAppleHealthQtQuery, GetLatestAppleHealthQtQuery } from './queries/get-apple-health-qt.query';
import { AppleHealthQtService } from './apple-health-qt.service';
import { Model } from 'mongoose';

@ApiTags('oxygenSaturation')
@Controller('oxygen-saturation')
export class OxygenSaturationController {
  constructor(
    @InjectModel('OxygenSaturation') 
    private readonly OxygenSaturationModel: Model<any>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly oxygenSaturationService: AppleHealthQtService,
  ) {}

  @ApiBody({ type: AppleHealthQtDto, description: 'Calories Burnt Data',isArray:true })
  @Post()
  async recordOxygenSaturation(@Body() oxygenSaturationData: AppleHealthQtDto[]): Promise<void> {
    const appleHealthQtModel = this.OxygenSaturationModel
    const userId = 'user123'; // Replace with your authentication logic to get the user ID
    const command = new RecordAppleHealthQtCommand(userId, oxygenSaturationData, appleHealthQtModel);
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
    const appleHealthQtModel = this.OxygenSaturationModel
    const query = new GetAppleHealthQtQuery(appleHealthQtModel,userId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined, source, page, limit);
    return this.oxygenSaturationService.getAppleHealthQt(query);
  }

  @ApiOperation({ summary: 'Get latest calories burnt data' })
  @ApiQuery({ name: 'userId', required: true })
  @Get('/latest')
  async getLatestOxygenSaturation(
    @Query('userId') userId: string,
  ): Promise<any> {
    const appleHealthQtModel = this.OxygenSaturationModel
    const query = new GetLatestAppleHealthQtQuery(appleHealthQtModel,userId);
    return this.oxygenSaturationService.getLatestAppleHealthQt(query);
  }

}
