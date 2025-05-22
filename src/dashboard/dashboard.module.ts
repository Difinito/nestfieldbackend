import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
// import { DashboardController } from './dashboard.controller';
import { UsersModule } from '../users/users.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { InvestmentsModule } from '../investments/investments.module';
import { EventsModule } from '../events/events.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    InvestmentsModule,
    EventsModule,
    AchievementsModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {} 