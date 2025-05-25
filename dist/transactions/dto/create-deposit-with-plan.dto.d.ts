import { CryptoAsset } from '../../common/enums';
export declare class CreateDepositWithPlanDto {
    planId: string;
    amount: number;
    asset: CryptoAsset;
    walletAddress?: string;
    txHash?: string;
}
