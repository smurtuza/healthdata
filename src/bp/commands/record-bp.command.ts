import { BpDto } from "../dto/bp.dto";
export class RecordBpCommand {
    constructor(
      public readonly userId: string,
      public readonly bpData: BpDto[],
    ) {}
  }
  