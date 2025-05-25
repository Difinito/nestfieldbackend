import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountSummary } from './interfaces/account-summary.interface';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('account-summary')
  getAccountSummary(@Request() req): Promise<AccountSummary> {
    return this.dashboardService.getAccountSummary(req.user.userId);
  }

  @Get('portfolio-allocation')
  getPortfolioAllocation(@Request() req) {
    return this.dashboardService.getPortfolioAllocation(req.user.userId);
  }

  @Get('recent-transactions')
  getRecentTransactions(@Request() req) {
    return this.dashboardService.getRecentTransactions(req.user.userId);
  }

  @Get('next-payouts')
  getNextPayouts(@Request() req) {
    return this.dashboardService.getNextPayouts(req.user.userId);
  }

  @Get('achievements')
  getAchievements(@Request() req) {
    return this.dashboardService.getAchievements(req.user.userId);
  }

  @Get('upcoming-events')
  getUpcomingEvents() {
    return this.dashboardService.getUpcomingEvents();
  }
} 