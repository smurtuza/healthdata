// src/step-count/dto/step-count.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class StepCountDto {
  @ApiProperty()
  date: Date;

  @ApiProperty()
  count: number;

  @ApiProperty()
  source: string;
}
