// src/step-count/dto/record-step-count.dto.ts
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AppleHealthQtDto } from './apple-health-qt.dto';

export class RecordAppleHealthQtDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ type: [AppleHealthQtDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AppleHealthQtDto)
  data: AppleHealthQtDto[];
}