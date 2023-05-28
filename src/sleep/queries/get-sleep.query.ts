// src/sleep/queries/get-sleep.query.ts
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
    startDate?: string,
    endDate?: string,
    source?: string,
    page?: number,
    limit?: number,
  ) {
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.source = source;
    this.page = page;
    this.limit = limit;
  }
}
