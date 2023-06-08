import { Body, Controller, Get, Post, Query ,ValidationPipe} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RecordBpCommand } from './commands/record-bp.command';
import { GetBpQuery, GetLatestBpQuery } from './queries/get-bp.query';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { BpService } from './bp.service';
import { RecordBpDto } from './dto/record.bp.dto';

@ApiTags('BP')
@Controller('bp')
export class BpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly bpService: BpService,
  ) {}

  @ApiBody({ type: RecordBpDto, description: 'BP Data'})
  @Post()
  async recordBP(@Body(ValidationPipe) body: RecordBpDto): Promise<void> {
    const { userId, data } = body;

    // const data = data.map((item) => ([{
    //   source: item.source,
    //   startDate: item.startDate,
    //   endDate: item.endDate,
    //   value: item.value,
    // }]));
    // const userId = 'user123'; // Replace with your authentication logic to get the user ID
    const command = new RecordBpCommand(userId, data);
    await this.commandBus.execute(command);
  }

  @ApiOperation({ summary: 'Get BP data' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'source', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getBp(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('source') source: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    const query = new GetBpQuery(userId,page?page:1, limit?limit:10, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined, source);
    return this.bpService.getBp(query);
  }


  @ApiOperation({ summary: 'Get latest BP data' })
  @ApiQuery({ name: 'userId', required: true })
  @Get('/latest')
  async getLatestBp(
    @Query('userId') userId: string,
  ): Promise<any> {
    const query = new GetLatestBpQuery(userId);
    return this.bpService.getLatestBp(query);
  }
}
