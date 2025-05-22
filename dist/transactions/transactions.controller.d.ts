import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(req: any, createTransactionDto: CreateTransactionDto): Promise<{
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        completedAt: Date | null;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
    }>;
    findAll(req: any, page?: number, limit?: number): Promise<{
        transactions: {
            id: string;
            userId: string;
            amount: number;
            status: import(".prisma/client").$Enums.TransactionStatus;
            notes: string | null;
            createdAt: Date;
            type: import(".prisma/client").$Enums.TransactionType;
            completedAt: Date | null;
            asset: import(".prisma/client").$Enums.CryptoAsset;
            walletAddress: string | null;
            txHash: string | null;
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
            userId: string;
            amount: number;
            status: import(".prisma/client").$Enums.TransactionStatus;
            notes: string | null;
            createdAt: Date;
            type: import(".prisma/client").$Enums.TransactionType;
            completedAt: Date | null;
            asset: import(".prisma/client").$Enums.CryptoAsset;
            walletAddress: string | null;
            txHash: string | null;
        }[];
    }>;
    findOne(req: any, id: string): Promise<{
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        completedAt: Date | null;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
    }>;
    approve(id: string): Promise<{
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        completedAt: Date | null;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
    }>;
    reject(id: string): Promise<{
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        completedAt: Date | null;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
    }>;
}
