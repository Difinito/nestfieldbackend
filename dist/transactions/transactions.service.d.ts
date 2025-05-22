import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
export declare class TransactionsService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    create(userId: string, createTransactionDto: CreateTransactionDto): Promise<{
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
    findAll(userId: string, page?: number, limit?: number): Promise<{
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
    findOne(userId: string, id: string): Promise<{
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
    approveTransaction(id: string): Promise<{
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
    rejectTransaction(id: string): Promise<{
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
    getUserTransactionStats(userId: string): Promise<{
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
}
