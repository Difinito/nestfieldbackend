import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvestmentsService } from '../investments/investments.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    private readonly investmentsService: InvestmentsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async calculateDailyProfits() {
    this.logger.log('Calculating daily profits for all active investments');
    try {
      await this.investmentsService.calculateDailyProfits();
      this.logger.log('Daily profits calculation completed successfully');
    } catch (error) {
      this.logger.error('Error calculating daily profits', error.stack);
    }
  }
} 