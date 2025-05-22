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
    approve(id: string, transactionHash?: string): Promise<{
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
    reject(id: string, reason?: string): Promise<{
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
