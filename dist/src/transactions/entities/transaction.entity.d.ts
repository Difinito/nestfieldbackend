import { User } from '../../users/entities/user.entity';
export declare enum TransactionType {
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdrawal",
    INVESTMENT = "investment",
    PROFIT = "profit",
    REFERRAL_BONUS = "referral_bonus"
}
export declare enum TransactionStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    REJECTED = "rejected"
}
export declare enum CryptoAsset {
    BTC = "btc",
    ETH = "eth",
    USDT = "usdt"
}
export declare class Transaction {
    id: string;
    user: User;
    userId: string;
    type: TransactionType;
    status: TransactionStatus;
    amount: number;
    asset: CryptoAsset;
    walletAddress: string;
    txHash: string;
    referenceId: string;
    notes: string;
    createdAt: Date;
    completedAt: Date;
}
