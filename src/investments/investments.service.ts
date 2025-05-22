import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInvestmentDto } from './dto/create-user-investment.dto';
import { UsersService } from '../users/users.service';
import { InvestmentStatus } from '../common/enums';

@Injectable()
export class InvestmentsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createUserInvestmentDto: CreateUserInvestmentDto) {
    const plan = await this.prisma.investmentPlan.findUnique({
      where: { id: createUserInvestmentDto.planId },
    });
    
    if (!plan) {
      throw new NotFoundException('Investment plan not found');
    }
    
    await this.usersService.findOne(userId);

    if (createUserInvestmentDto.amount < plan.minAmount) {
      throw new BadRequestException(`Minimum investment amount is ${plan.minAmount}`);
    }

    if (plan.maxAmount && createUserInvestmentDto.amount > plan.maxAmount) {
      throw new BadRequestException(`Maximum investment amount is ${plan.maxAmount}`);
    }

    return this.prisma.investment.create({
      data: {
        userId,
        planId: plan.id,
        amount: createUserInvestmentDto.amount,
        returnAmount: createUserInvestmentDto.amount * (1 + plan.returnRate / 100),
        status: InvestmentStatus.ACTIVE,
        startDate: new Date(),
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.investment.findMany({
      where: { userId },
      include: { plan: true },
    });
  }

  async findOne(userId: string, id: string) {
    const investment = await this.prisma.investment.findFirst({
      where: { id, userId },
      include: { plan: true },
    });

    if (!investment) {
      throw new NotFoundException('Investment not found');
    }

    return investment;
  }

  async activateInvestment(id: string) {
    const investment = await this.prisma.investment.findFirst({
      where: { id },
      include: { plan: true },
    });

    if (!investment) {
      throw new NotFoundException('Investment not found');
    }

    // Set investment to active and calculate dates
    const now = new Date();
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + investment.plan.duration);

    const nextPayoutDate = new Date(now);
    nextPayoutDate.setDate(nextPayoutDate.getDate() + 1); // Daily payouts

    return this.prisma.investment.update({
      where: { id },
      data: {
        status: InvestmentStatus.ACTIVE,
        startDate: now,
        endDate,
        nextPayoutDate,
      },
    });
  }

  async completeInvestment(id: string) {
    const investment = await this.prisma.investment.findFirst({
      where: { id, status: 'ACTIVE' },
    });

    if (!investment) {
      throw new NotFoundException('Active investment not found');
    }

    return this.prisma.investment.update({
      where: { id },
      data: {
        status: 'COMPLETED',
      },
    });
  }

  async calculateDailyProfits() {
    const now = new Date();
    
    // Find active investments that need payout
    const investments = await this.prisma.investment.findMany({
      where: {
        status: 'ACTIVE',
        nextPayoutDate: {
          lt: now,
        },
      },
      include: { plan: true },
    });

    for (const investment of investments) {
      // Calculate daily profit (interest rate is annual, so divide by 365)
      const dailyRate = investment.plan.returnRate / 365;
      const dailyProfit = investment.amount * (dailyRate / 100);
      
      // Set next payout date
      const nextPayoutDate = new Date(investment.nextPayoutDate);
      nextPayoutDate.setDate(nextPayoutDate.getDate() + 1);
      
      // Check if investment is completed
      const newStatus = investment.endDate <= now ? 'COMPLETED' : 'ACTIVE';
      
      // Update the investment
      await this.prisma.investment.update({
        where: { id: investment.id },
        data: {
          returnAmount: {
            increment: dailyProfit,
          },
          nextPayoutDate,
          status: newStatus,
        },
      });
      
      // Create a transaction record for this profit
      await this.prisma.transaction.create({
        data: {
          userId: investment.userId,
          type: 'PROFIT',
          status: 'COMPLETED',
          amount: dailyProfit,
          asset: 'USD',
          notes: `Daily profit from ${investment.plan.name} investment`,
          completedAt: new Date(),
        },
      });
    }
  }

  async getUserStatistics(userId: string) {
    const [activeInvestments, completedInvestments] = await Promise.all([
      this.prisma.investment.findMany({
        where: { 
          userId,
          status: 'ACTIVE'
        },
        include: { plan: true },
      }),
      this.prisma.investment.findMany({
        where: { 
          userId,
          status: 'COMPLETED'
        },
      }),
    ]);

    // Calculate total invested amount
    const totalInvested = activeInvestments.reduce((sum, inv) => sum + Number(inv.amount), 0);
    
    // Calculate total profit
    const totalProfit = [...activeInvestments, ...completedInvestments]
      .reduce((sum, inv) => sum + (Number(inv.returnAmount) - Number(inv.amount)), 0);
    
    // Calculate next payouts
    const nextPayouts = activeInvestments.map(inv => ({
      investmentId: inv.id,
      planName: inv.plan.name,
      nextPayoutDate: inv.nextPayoutDate,
      estimatedPayout: Number(inv.amount) * (inv.plan.returnRate / 365 / 100)
    }));

    return {
      totalInvested,
      totalProfit,
      activeInvestments: activeInvestments.length,
      completedInvestments: completedInvestments.length,
      nextPayouts,
    };
  }
} 