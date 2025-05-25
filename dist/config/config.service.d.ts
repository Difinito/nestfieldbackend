import { CryptoAsset } from '../common/enums';
export declare class ConfigService {
    private readonly walletAddresses;
    constructor();
    getWalletAddress(asset: CryptoAsset): string;
}
