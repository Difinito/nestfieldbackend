import { CryptoAsset, PaymentMethod } from '../../common/enums';
declare class BankAccountDetails {
    bankName: string;
    accountNumber: string;
    accountName: string;
    routingNumber?: string;
}
declare class CryptoWalletDetails {
    walletAddress: string;
    network: string;
}
export declare class CreateWithdrawalDto {
    amount: number;
    currency: CryptoAsset;
    paymentMethod: PaymentMethod;
    accountDetails: BankAccountDetails | CryptoWalletDetails;
    notes?: string;
}
export {};
