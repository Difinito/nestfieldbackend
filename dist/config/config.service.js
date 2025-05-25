"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../common/enums");
let ConfigService = class ConfigService {
    constructor() {
        this.walletAddresses = {
            [enums_1.CryptoAsset.BTC]: process.env.BTC_WALLET_ADDRESS,
            [enums_1.CryptoAsset.ETH]: process.env.ETH_WALLET_ADDRESS,
            [enums_1.CryptoAsset.USDT]: process.env.USDT_WALLET_ADDRESS,
            [enums_1.CryptoAsset.USDC]: process.env.USDC_WALLET_ADDRESS,
            [enums_1.CryptoAsset.USD]: '',
        };
        Object.entries(this.walletAddresses).forEach(([asset, address]) => {
            if (asset !== enums_1.CryptoAsset.USD && !address) {
                throw new Error(`Missing wallet address configuration for ${asset}`);
            }
        });
    }
    getWalletAddress(asset) {
        const address = this.walletAddresses[asset];
        if (!address && asset !== enums_1.CryptoAsset.USD) {
            throw new Error(`No wallet address configured for ${asset}`);
        }
        return address;
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ConfigService);
//# sourceMappingURL=config.service.js.map