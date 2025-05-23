import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from '../users/users.service';
export declare class TransactionsService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    create(userId: string, createTransactionDto: CreateTransactionDto): Promise<{
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
    findAll(userId: string, page?: number, limit?: number): Promise<{
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
    findOne(userId: string, id: string): Promise<{
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
    approveTransaction(id: string): Promise<{
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
    rejectTransaction(id: string): Promise<{
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
    getUserTransactionStats(userId: string): Promise<{
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
}
