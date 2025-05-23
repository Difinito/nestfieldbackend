import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, createTransactionDto: CreateTransactionDto): Promise<{
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
    }>;
    findAll(req: any, page?: string, limit?: string): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            amount: number;
            userId: string;
            status: import(".prisma/client").$Enums.TransactionStatus;
            type: import(".prisma/client").$Enums.TransactionType;
            asset: import(".prisma/client").$Enums.CryptoAsset;
            walletAddress: string | null;
            txHash: string | null;
            notes: string | null;
            completedAt: Date | null;
        }[];
        total: number;
    }>;
    getStats(req: any): Promise<{
        deposits: number;
        withdrawals: number;
        profits: number;
        referralBonuses: number;
        balance: number;
        recentTransactions: {
            id: string;
            createdAt: Date;
            amount: number;
            userId: string;
            status: import(".prisma/client").$Enums.TransactionStatus;
            type: import(".prisma/client").$Enums.TransactionType;
            asset: import(".prisma/client").$Enums.CryptoAsset;
            walletAddress: string | null;
            txHash: string | null;
            notes: string | null;
            completedAt: Date | null;
        }[];
    }>;
    findOne(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
    }>;
    approve(id: string): Promise<{
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
    }>;
    reject(id: string): Promise<{
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
    }>;
}
