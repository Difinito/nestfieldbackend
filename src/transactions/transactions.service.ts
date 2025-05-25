import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { TransactionStatus, TransactionType, CryptoAsset, InvestmentStatus } from '../common/enums';
import { InvestmentPlansService } from '../investments/investment-plans.service';
import { CreateDepositWithPlanDto } from './dto/create-deposit-with-plan.dto';
import { ConfigService } from '../config/config.service';
import { TransactionStats } from './interfaces/transaction-stats.interface';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private investmentPlansService: InvestmentPlansService,
    private configService: ConfigService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    // Verify the user exists
    await this.usersService.findOne(userId);

    return this.prisma.transaction.create({
      data: {
        userId,
        type: createTransactionDto.type,
        amount: createTransactionDto.amount,
        asset: createTransactionDto.asset,
        walletAddress: createTransactionDto.walletAddress,
        txHash: createTransactionDto.txHash,
        notes: createTransactionDto.notes,
        status: 'PENDING'
      },
    });
  }

  async findAll(userId: string, page = 1, limit = 10) {
    // Ensure we have valid numbers
    if (!Number.isInteger(page) || !Number.isInteger(limit)) {
      page = 1;
      limit = 10;
    }

    // Validate and sanitize page and limit
    const validPage = Math.max(1, page);
    const validLimit = Math.min(100, Math.max(1, limit));

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip: (validPage - 1) * validLimit,
        take: validLimit,
      }),
      this.prisma.transaction.count({
        where: { userId },
      }),
    ]);

    return { transactions, total };
  }

  async findOne(userId: string, id: string) {
    const transaction = await this.prisma.transaction.findFirst({ 
      where: { id, userId } 
    });
    
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    
    return transaction;
  }

  async approveTransaction(id: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, status: 'PENDING' }
    });
    
    if (!transaction) {
      throw new NotFoundException('Pending transaction not found');
    }

    // Parse the notes to get plan information
    let planInfo;
    try {
      planInfo = JSON.parse(transaction.notes);
    } catch (e) {
      planInfo = null;
    }
    
    // If this is a deposit and there's a referred by user, add referral bonus
    if (transaction.type === 'DEPOSIT') {
      const user = await this.usersService.findOne(transaction.userId);
      
      if (user.referredBy) {
        const referrer = await this.usersService.findByEmail(user.referredBy);
        
        // Calculate 5% referral bonus
        const bonusAmount = Number(transaction.amount) * 0.05;
        
        // Create a referral bonus transaction
        await this.prisma.transaction.create({
          data: {
            userId: referrer.id,
            type: 'REFERRAL_BONUS',
            status: 'COMPLETED',
            amount: bonusAmount,
            asset: transaction.asset,
            notes: `Referral bonus from user ${user.email}`,
            completedAt: new Date(),
          }
        });
        
        // Update the referrer's referral bonus
        await this.usersService.update(referrer.id, {
          referralBonus: referrer.referralBonus + bonusAmount,
        });
      }

      // If this is a deposit with a plan, create an investment
      if (planInfo?.planId) {
        const plan = await this.investmentPlansService.findOne(planInfo.planId);
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + plan.duration);

        await this.prisma.investment.create({
          data: {
            userId: transaction.userId,
            planId: planInfo.planId,
            amount: transaction.amount,
            returnAmount: transaction.amount * (1 + plan.returnRate / 100),
            status: InvestmentStatus.ACTIVE,
            startDate: now,
            endDate,
            nextPayoutDate: new Date(now.setDate(now.getDate() + 1)), // Daily payouts
          }
        });
      }
    }
    
    return this.prisma.transaction.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });
  }

  async rejectTransaction(id: string) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, status: 'PENDING' }
    });
    
    if (!transaction) {
      throw new NotFoundException('Pending transaction not found');
    }
    
    return this.prisma.transaction.update({
      where: { id },
      data: {
        status: 'REJECTED',
      },
    });
  }

  async getUserTransactionStats(userId: string): Promise<TransactionStats> {
    // Get all completed transactions for the user
    const transactions = await this.prisma.transaction.findMany({
      where: { userId, status: 'COMPLETED' },
    });

    // Initialize stats object with asset-specific tracking
    const stats = {
      total: {
        deposits: 0,
        withdrawals: 0,
        profits: 0,
        referralBonuses: 0,
        balance: 0
      },
      byAsset: {} as Record<string, {
        deposits: number;
        withdrawals: number;
        profits: number;
        referralBonuses: number;
        balance: number;
      }>,
      recentTransactions: await this.prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
      })
    };

    // Process each transaction
    transactions.forEach(t => {
      const amount = Number(t.amount);
      const asset = t.asset;

      // Initialize asset stats if not exists
      if (!stats.byAsset[asset]) {
        stats.byAsset[asset] = {
          deposits: 0,
          withdrawals: 0,
          profits: 0,
          referralBonuses: 0,
          balance: 0
        };
      }

      // Update totals based on transaction type
      switch (t.type) {
        case 'DEPOSIT':
          stats.total.deposits += amount;
          stats.byAsset[asset].deposits += amount;
          break;
        case 'WITHDRAWAL':
          stats.total.withdrawals += amount;
          stats.byAsset[asset].withdrawals += amount;
          break;
        case 'PROFIT':
          stats.total.profits += amount;
          stats.byAsset[asset].profits += amount;
          break;
        case 'REFERRAL_BONUS':
          stats.total.referralBonuses += amount;
          stats.byAsset[asset].referralBonuses += amount;
          break;
      }
    });

    // Calculate balances
    stats.total.balance = stats.total.deposits + stats.total.profits + 
                         stats.total.referralBonuses - stats.total.withdrawals;

    // Calculate balances for each asset
    Object.keys(stats.byAsset).forEach(asset => {
      const assetStats = stats.byAsset[asset];
      assetStats.balance = assetStats.deposits + assetStats.profits + 
                          assetStats.referralBonuses - assetStats.withdrawals;
    });

    return stats;
  }

  async createDepositWithPlan(userId: string, createDepositDto: CreateDepositWithPlanDto) {
    // Verify the investment plan exists and is active
    const plan = await this.investmentPlansService.findOne(createDepositDto.planId);
    
    if (!plan.isActive) {
      throw new BadRequestException('This investment plan is not active');
    }

    // Verify amount is within plan limits
    if (createDepositDto.amount < plan.minAmount || createDepositDto.amount > plan.maxAmount) {
      throw new BadRequestException(`Amount must be between ${plan.minAmount} and ${plan.maxAmount}`);
    }

    // For BTC, ETH, and USDT, require txHash
    if (['BTC', 'ETH', 'USDT'].includes(createDepositDto.asset) && !createDepositDto.txHash) {
      throw new BadRequestException('Transaction hash is required for BTC, ETH, and USDT deposits');
    }

    // Get the wallet address for the selected asset
    const walletAddress = this.configService.getWalletAddress(createDepositDto.asset);

    // Create the deposit transaction
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        type: TransactionType.DEPOSIT,
        status: TransactionStatus.PENDING,
        amount: createDepositDto.amount,
        asset: createDepositDto.asset,
        walletAddress: walletAddress,
        txHash: createDepositDto.txHash,
        notes: JSON.stringify({
          planId: createDepositDto.planId,
          planName: plan.name,
          returnRate: plan.returnRate,
          duration: plan.duration
        })
      }
    });

    return {
      ...transaction,
      walletAddress // Include the wallet address in the response
    };
  }
} 