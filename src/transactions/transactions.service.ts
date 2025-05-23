import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { TransactionStatus, TransactionType, CryptoAsset } from '../common/enums';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
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

  async getUserTransactionStats(userId: string) {
    // Get all completed transactions for the user
    const transactions = await this.prisma.transaction.findMany({
      where: { userId, status: 'COMPLETED' },
    });

    // Calculate totals by type
    const deposits = transactions
      .filter(t => t.type === 'DEPOSIT')
      .reduce((sum, t) => sum + Number(t.amount), 0);
      
    const withdrawals = transactions
      .filter(t => t.type === 'WITHDRAWAL')
      .reduce((sum, t) => sum + Number(t.amount), 0);
      
    const profits = transactions
      .filter(t => t.type === 'PROFIT')
      .reduce((sum, t) => sum + Number(t.amount), 0);
      
    const referralBonuses = transactions
      .filter(t => t.type === 'REFERRAL_BONUS')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Calculate balance
    const balance = deposits + profits + referralBonuses - withdrawals;

    // Get recent transactions
    const recentTransactions = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return {
      deposits,
      withdrawals,
      profits,
      referralBonuses,
      balance,
      recentTransactions,
    };
  }
} 