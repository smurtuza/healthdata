// src/step-count/commands/record-step-count.command.ts
import { Model } from "mongoose";
import { AppleHealthQtDto } from "../dto/apple-health-qt.dto";
export class RecordAppleHealthQtCommand {
    constructor(
      public readonly userId: string,
      public readonly caloriesData: AppleHealthQtDto[],
      public readonly appleHealthQtModel: Model<any>,
    ) {}
  }
  