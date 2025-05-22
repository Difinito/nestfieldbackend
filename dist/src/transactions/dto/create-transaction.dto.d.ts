import { TransactionType, CryptoAsset } from '../../common/enums';
export declare class CreateTransactionDto {
    type: TransactionType;
    amount: number;
    asset: CryptoAsset;
    walletAddress?: string;
    txHash?: string;
    notes?: string;
}
