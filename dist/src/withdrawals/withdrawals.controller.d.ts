import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
export declare class WithdrawalsController {
    private readonly withdrawalsService;
    constructor(withdrawalsService: WithdrawalsService);
    create(req: any, createWithdrawalDto: CreateWithdrawalDto): Promise<{
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
    findAll(req: any): Promise<{
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
    }[]>;
    findOne(req: any, id: string): Promise<{
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
