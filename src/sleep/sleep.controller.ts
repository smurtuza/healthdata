// src/sleep/sleep.controller.ts
import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SleepDto } from './dto/sleep.dto';
import { RecordSleepDto } from './dto/record.sleep.dto';
import { RecordSleepCommand } from './commands/record-sleep.command';
import { GetSleepQuery , GetLatestSleepQuery} from './queries/get-sleep.query';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { SleepService } from './sleep.service';
import { SleepSchema } from './sleep.schema';


@ApiTags('sleep')
@Controller('sleep')
export class SleepController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly sleepService: SleepService,
  ) {}

  @ApiBody({ type: RecordSleepDto, description: 'Sleep Data' })
  @Post()
  async recordSleep(@Body(ValidationPipe) body: RecordSleepDto): Promise<void> {
    const {userId, data} = body
    // const userId = 'user123'; // Replace with your authentication logic to get the user ID
    const command = new RecordSleepCommand(userId, data);
    await this.commandBus.execute(command);
  }

  @ApiOperation({ summary: 'Get sleep data' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'source', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getSleep(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('source') source: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    const query = new GetSleepQuery(userId, page?page:1, limit?limit:10, startDate, endDate, source);
    return this.sleepService.getSleep(query);
  }

  @ApiOperation({ summary: 'Get Latest sleep data' })
  @ApiQuery({ name: 'userId', required: true })
  @Get("/latest")
  async getLatestSleep(
    @Query('userId') userId: string,
  ): Promise<any> {
    const query = new GetLatestSleepQuery(userId);
    return this.sleepService.getLatestSleep(query);
  }

}
