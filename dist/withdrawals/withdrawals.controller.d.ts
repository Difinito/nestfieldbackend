import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
export declare class WithdrawalsController {
    private readonly withdrawalsService;
    constructor(withdrawalsService: WithdrawalsService);
    create(req: any, createWithdrawalDto: CreateWithdrawalDto): Promise<{
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
    findAll(req: any): Promise<{
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
    findOne(req: any, id: string): Promise<{
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
