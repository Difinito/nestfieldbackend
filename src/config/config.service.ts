import { Injectable } from '@nestjs/common';
import { CryptoAsset } from '../common/enums';

@Injectable()
export class ConfigService {
  private readonly walletAddresses: Record<CryptoAsset, string>;

  constructor() {
    this.walletAddresses = {
      [CryptoAsset.BTC]: process.env.BTC_WALLET_ADDRESS,
      [CryptoAsset.ETH]: process.env.ETH_WALLET_ADDRESS,
      [CryptoAsset.USDT]: process.env.USDT_WALLET_ADDRESS,
      [CryptoAsset.USDC]: process.env.USDC_WALLET_ADDRESS,
      [CryptoAsset.USD]: '', // USD doesn't need a wallet address
    };

    // Validate that all required wallet addresses are configured
    Object.entries(this.walletAddresses).forEach(([asset, address]) => {
      if (asset !== CryptoAsset.USD && !address) {
        throw new Error(`Missing wallet address configuration for ${asset}`);
      }
    });
  }

  getWalletAddress(asset: CryptoAsset): string {
    const address = this.walletAddresses[asset];
    if (!address && asset !== CryptoAsset.USD) {
      throw new Error(`No wallet address configured for ${asset}`);
    }
    return address;
  }
} 