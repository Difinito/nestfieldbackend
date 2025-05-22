import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InvestmentsModule } from './investments/investments.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsModule } from './events/events.module';
import { AchievementsModule } from './achievements/achievements.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaModule } from './prisma/prisma.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      expandVariables: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    InvestmentsModule,
    TransactionsModule,
    EventsModule,
    AchievementsModule,
    DashboardModule,
    WithdrawalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 