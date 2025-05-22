export declare class WithdrawalResponseDto {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string;
    accountDetails: Record<string, any>;
    transactionHash: string | null;
    fee: number;
    netAmount: number;
    notes: string | null;
    processedAt: Date | null;
    createdAt: Date;
}
export declare class WithdrawalListResponseDto {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string;
    accountDetails: Record<string, any>;
    transactionHash: string | null;
    processedAt: Date | null;
    createdAt: Date;
}
