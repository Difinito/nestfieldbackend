import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
import { InvestmentPlansService } from '../investments/investment-plans.service';
import { CreateDepositWithPlanDto } from './dto/create-deposit-with-plan.dto';
import { ConfigService } from '../config/config.service';
import { TransactionStats } from './interfaces/transaction-stats.interface';
export declare class TransactionsService {
    private prisma;
    private usersService;
    private investmentPlansService;
    private configService;
    constructor(prisma: PrismaService, usersService: UsersService, investmentPlansService: InvestmentPlansService, configService: ConfigService);
    create(userId: string, createTransactionDto: CreateTransactionDto): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
        amount: number;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
        createdAt: Date;
    }>;
    findAll(userId: string, page?: number, limit?: number): Promise<{
        transactions: {
            id: string;
            userId: string;
            type: import(".prisma/client").$Enums.TransactionType;
            status: import(".prisma/client").$Enums.TransactionStatus;
            amount: number;
            asset: import(".prisma/client").$Enums.CryptoAsset;
            walletAddress: string | null;
            txHash: string | null;
            notes: string | null;
            completedAt: Date | null;
            createdAt: Date;
        }[];
        total: number;
    }>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
        amount: number;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
        createdAt: Date;
    }>;
    approveTransaction(id: string): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
        amount: number;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
        createdAt: Date;
    }>;
    rejectTransaction(id: string): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
        amount: number;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
        createdAt: Date;
    }>;
    getUserTransactionStats(userId: string): Promise<TransactionStats>;
    createDepositWithPlan(userId: string, createDepositDto: CreateDepositWithPlanDto): Promise<{
        walletAddress: string;
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
        amount: number;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
        createdAt: Date;
    }>;
}
