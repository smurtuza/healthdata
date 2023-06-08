export class GetBpQuery {
    constructor(
      public readonly userId: string,
      public readonly page?: number,
      public readonly limit?: number,
      public readonly startDate?: Date,
      public readonly endDate?: Date,
      public readonly source?: string,
      
    ) {}
  }
  
export class GetLatestBpQuery {
  constructor(
    public readonly userId: string
  ) {}
}