import { PrismaService } from '../prisma/prisma.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { TransactionStatus } from '../common/enums';
export declare class WithdrawalsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createWithdrawalDto: CreateWithdrawalDto): Promise<{
        id: string;
        userId: string;
        amount: number;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        status: import(".prisma/client").$Enums.TransactionStatus;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        notes: string | null;
        processedAt: Date | null;
        createdAt: Date;
    }>;
    findByUserId(userId: string): Promise<{
        id: string;
        userId: string;
        amount: number;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        status: import(".prisma/client").$Enums.TransactionStatus;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        notes: string | null;
        processedAt: Date | null;
        createdAt: Date;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        userId: string;
        amount: number;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        status: import(".prisma/client").$Enums.TransactionStatus;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        notes: string | null;
        processedAt: Date | null;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        userId: string;
        amount: number;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        status: import(".prisma/client").$Enums.TransactionStatus;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        notes: string | null;
        processedAt: Date | null;
        createdAt: Date;
    })[]>;
    findOneAdmin(id: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
    } & {
        id: string;
        userId: string;
        amount: number;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        status: import(".prisma/client").$Enums.TransactionStatus;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        notes: string | null;
        processedAt: Date | null;
        createdAt: Date;
    }>;
    updateStatus(id: string, status: TransactionStatus, transactionHash?: string, notes?: string): Promise<{
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        amount: number;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        status: import(".prisma/client").$Enums.TransactionStatus;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        notes: string | null;
        processedAt: Date | null;
        createdAt: Date;
    }>;
}
