// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { SleepModule } from './sleep/sleep.module';
import { StepCountModule } from './step-count/step-count.module';
import { CaloriesModule } from './appleHealth/calories/calories.module';
import { OxygenSaturationModule } from './appleHealth/oxygen-saturation/oxygen-saturation.module';
import { HeartRateModule } from './appleHealth/heart-rate/heart-rate.module';
import { BloodGlucoseModule } from './appleHealth/blood-glucose/blood-glucose.module';
import { BPModule } from './bp/bp.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://microuser:microuser@cluster0.szm8xo6.mongodb.net/sleep_db'),
    CqrsModule,
    SleepModule,
    StepCountModule,
    CaloriesModule,
    OxygenSaturationModule,
    HeartRateModule,
    BloodGlucoseModule,
    BPModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
