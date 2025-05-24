import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { UsersModule } from '../users/users.module';
import { InvestmentsModule } from '../investments/investments.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    InvestmentsModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, ConfigService],
  exports: [TransactionsService],
})
export class TransactionsModule {} 