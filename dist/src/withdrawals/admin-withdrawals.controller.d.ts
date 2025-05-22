import { WithdrawalsService } from './withdrawals.service';
export declare class AdminWithdrawalsController {
    private readonly withdrawalsService;
    constructor(withdrawalsService: WithdrawalsService);
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    }>;
    approve(id: string, transactionHash?: string): Promise<{
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    }>;
    reject(id: string, reason?: string): Promise<{
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        currency: import(".prisma/client").$Enums.CryptoAsset;
        paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
        accountDetails: import("@prisma/client/runtime/library").JsonValue;
        transactionHash: string | null;
        fee: number;
        netAmount: number;
        processedAt: Date | null;
    }>;
}
