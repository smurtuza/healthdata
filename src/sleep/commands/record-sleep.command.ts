// src/sleep/commands/record-sleep.command.ts
import { SleepDto } from '../dto/sleep.dto';

export class RecordSleepCommand {
    constructor(
      public readonly userId: string,
      public readonly sleepData: SleepDto[],
    ) {}
  }
  
  export class SleepRecordedEvent {
    constructor(
      public readonly userId: string,
      public readonly sleepData: SleepDto[],
    ) {}
  }
  