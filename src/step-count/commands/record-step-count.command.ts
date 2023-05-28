// src/step-count/commands/record-step-count.command.ts
import { StepCountDto } from "../dto/step-count.dto";
export class RecordStepCountCommand {
    constructor(
      public readonly userId: string,
      public readonly stepCountData: StepCountDto[],
    ) {}
  }
  