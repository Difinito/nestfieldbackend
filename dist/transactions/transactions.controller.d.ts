import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateDepositWithPlanDto } from './dto/create-deposit-with-plan.dto';
import { TransactionStats } from './interfaces/transaction-stats.interface';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, createTransactionDto: CreateTransactionDto): Promise<{
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
    createDepositWithPlan(req: any, createDepositDto: CreateDepositWithPlanDto): Promise<{
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
    findAll(req: any, page?: string, limit?: string): Promise<{
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
    getStats(req: any): Promise<TransactionStats>;
    approve(id: string): Promise<{
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
    reject(id: string): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
}
