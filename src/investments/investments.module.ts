import { Module } from '@nestjs/common';

import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';
import { InvestmentPlansController } from './investment-plans.controller';
import { InvestmentPlansService } from './investment-plans.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
  
    UsersModule
  ],
  controllers: [InvestmentsController, InvestmentPlansController],
  providers: [InvestmentsService, InvestmentPlansService],
  exports: [InvestmentsService, InvestmentPlansService],
})
export class InvestmentsModule {} 