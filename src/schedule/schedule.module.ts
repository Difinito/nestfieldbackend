import { Module } from '@nestjs/common';
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { InvestmentsModule } from '../investments/investments.module';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    NestScheduleModule.forRoot(),
    InvestmentsModule,
  ],
  providers: [ScheduleService],
})
export class ScheduleModule {} 