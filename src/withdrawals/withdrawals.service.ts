import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { TransactionStatus, PaymentMethod } from '../common/enums';

@Injectable()
export class WithdrawalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createWithdrawalDto: CreateWithdrawalDto) {
    // Check user balance
    const user = await this.prisma.user.findUnique({ 
      where: { id: userId },
    });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    // Calculate fee (example: 1.5% fee)
    const fee = createWithdrawalDto.amount * 0.015;
    const netAmount = createWithdrawalDto.amount - fee;
    
    // Create withdrawal record
    const withdrawal = await this.prisma.$transaction(async (tx) => {
      // Create the withdrawal
      return tx.withdrawal.create({
        data: {
          userId,
          amount: createWithdrawalDto.amount,
          currency: createWithdrawalDto.currency,
          status: TransactionStatus.PENDING,
          paymentMethod: createWithdrawalDto.paymentMethod,
          accountDetails: createWithdrawalDto.accountDetails as any,
          fee,
          netAmount,
          notes: createWithdrawalDto.notes,
        },
      });
    });
    
    // Mask sensitive information for bank accounts
    if (withdrawal.paymentMethod === PaymentMethod.BANK_TRANSFER) {
      const details = withdrawal.accountDetails as any;
      if (details.accountNumber) {
        details.accountNumber = '****' + details.accountNumber.slice(-4);
        withdrawal.accountDetails = details;
      }
    }
    
    return withdrawal;
  }

  async findByUserId(userId: string) {
    return this.prisma.withdrawal.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(userId: string, id: string) {
    const withdrawal = await this.prisma.withdrawal.findFirst({
      where: {
        id,
        userId,
      },
    });
    
    if (!withdrawal) {
      throw new NotFoundException(`Withdrawal with ID ${id} not found`);
    }
    
    return withdrawal;
  }

  async findAll() {
    return this.prisma.withdrawal.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOneAdmin(id: string) {
    const withdrawal = await this.prisma.withdrawal.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });
    
    if (!withdrawal) {
      throw new NotFoundException(`Withdrawal with ID ${id} not found`);
    }
    
    return withdrawal;
  }

  async updateStatus(
    id: string, 
    status: TransactionStatus, 
    transactionHash?: string,
    notes?: string
  ) {
    const withdrawal = await this.prisma.withdrawal.findUnique({
      where: { id },
    });
    
    if (!withdrawal) {
      throw new NotFoundException(`Withdrawal with ID ${id} not found`);
    }
    
    if (withdrawal.status !== TransactionStatus.PENDING) {
      throw new BadRequestException(`Withdrawal has already been ${withdrawal.status.toLowerCase()}`);
    }
    
    const updateData: any = {
      status,
      processedAt: status === TransactionStatus.COMPLETED ? new Date() : null,
    };
    
    if (transactionHash) {
      updateData.transactionHash = transactionHash;
    }
    
    if (notes) {
      updateData.notes = withdrawal.notes 
        ? `${withdrawal.notes}; Admin note: ${notes}`
        : `Admin note: ${notes}`;
    }
    
    return this.prisma.withdrawal.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          }
        }
      }
    });
  }
} 