import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TransactionsService } from '../transactions/transactions.service';
import { InvestmentsService } from '../investments/investments.service';
import { EventsService } from '../events/events.service';
import { AchievementsService } from '../achievements/achievements.service';
import { PlanAllocation } from './interfaces/plan-allocation.interface';
import { InvestmentStatus } from '../common/enums';
import { AccountSummary } from './interfaces/account-summary.interface';

@Injectable()
export class DashboardService {
  constructor(
    private readonly usersService: UsersService,
    private readonly transactionsService: TransactionsService,
    private readonly investmentsService: InvestmentsService,
    private readonly eventsService: EventsService,
    private readonly achievementsService: AchievementsService,
  ) {}

  async getAccountSummary(userId: string): Promise<AccountSummary> {
    const user = await this.usersService.findOne(userId);
    const transactionStats = await this.transactionsService.getUserTransactionStats(userId);
    const investmentStats = await this.investmentsService.getUserStatistics(userId);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        referralCode: user.referralCode,
        referralBonus: user.referralBonus,
      },
      balance: transactionStats.total.balance,
      deposits: transactionStats.total.deposits,
      withdrawals: transactionStats.total.withdrawals,
      profits: transactionStats.total.profits,
      referralBonuses: transactionStats.total.referralBonuses,
      activeInvestments: investmentStats.activeInvestments,
      completedInvestments: investmentStats.completedInvestments,
      totalInvested: investmentStats.totalInvested,
      totalProfit: investmentStats.totalProfit,
      assetStats: transactionStats.byAsset,
    };
  }

  async getPortfolioAllocation(userId: string) {
    const investments = await this.investmentsService.findAll(userId);
    const activeInvestments = investments.filter(inv => inv.status === InvestmentStatus.ACTIVE);
    
    // Group investments by plan
    const portfolioByPlan: Record<string, PlanAllocation> = activeInvestments.reduce((result, inv) => {
      const planName = inv.plan.name;
      
      if (!result[planName]) {
        result[planName] = {
          planId: inv.planId,
          planName: planName,
          totalAmount: 0,
          count: 0,
          percentage: 0,
        };
      }
      
      result[planName].totalAmount += Number(inv.amount);
      result[planName].count += 1;
      
      return result;
    }, {} as Record<string, PlanAllocation>);
    
    // Calculate total
    const totalInvested = Object.values(portfolioByPlan).reduce(
      (total, plan) => total + plan.totalAmount, 
      0
    );
    
    // Calculate percentages
    if (totalInvested > 0) {
      Object.values(portfolioByPlan).forEach((plan) => {
        plan.percentage = (plan.totalAmount / totalInvested) * 100;
      });
    }
    
    return {
      totalInvested,
      allocation: Object.values(portfolioByPlan),
    };
  }

  async getRecentTransactions(userId: string) {
    const { transactions } = await this.transactionsService.findAll(userId, 1, 10);
    return transactions;
  }

  async getNextPayouts(userId: string) {
    const stats = await this.investmentsService.getUserStatistics(userId);
    return stats.nextPayouts;
  }

  async getAchievements(userId: string) {
    return this.achievementsService.findAll(userId);
  }

  async getUpcomingEvents() {
    return this.eventsService.findUpcoming();
  }
} 