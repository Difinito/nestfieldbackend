import { PrismaService } from '../prisma/prisma.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { TransactionStatus } from '../common/enums';
export declare class WithdrawalsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createWithdrawalDto: CreateWithdrawalDto): Promise<{
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import(".prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    }>;
    findByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import(".prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import(".prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    }>;
    findAll(): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import(".prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    })[]>;
    findOneAdmin(id: string): Promise<{
        user: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import(".prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    }>;
    updateStatus(id: string, status: TransactionStatus, transactionHash?: string, notes?: string): Promise<{
        user: {
            email: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import(".prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    }>;
}
