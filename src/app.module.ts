// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { SleepModule } from './sleep/sleep.module';
import { StepCountModule } from './step-count/step-count.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://microuser:microuser@cluster0.szm8xo6.mongodb.net/sleep_db'),
    CqrsModule,SleepModule,StepCountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
