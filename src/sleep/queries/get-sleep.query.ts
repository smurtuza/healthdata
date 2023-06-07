import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetSleepQuery {
  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  startDate?: string;

  @ApiPropertyOptional()
  endDate?: string;

  @ApiPropertyOptional()
  source?: string;

  @ApiPropertyOptional()
  page?: number;

  @ApiPropertyOptional()
  limit?: number;

  constructor(
    userId: string,
    page?: number,
    limit?: number,
    startDate?: string,
    endDate?: string,
    source?: string,
    
  ) {
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.source = source;
    this.page = page;
    this.limit = limit;
  }
}


export class GetLatestSleepQuery {
  @ApiProperty()
  userId: string;
  constructor( userId: string) {
    this.userId = userId
  }
}