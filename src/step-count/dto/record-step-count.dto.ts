// src/step-count/dto/record-step-count.dto.ts
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { StepCountDto } from './step-count.dto';

export class RecordStepCountDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ type: [StepCountDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepCountDto)
  data: StepCountDto[];
}