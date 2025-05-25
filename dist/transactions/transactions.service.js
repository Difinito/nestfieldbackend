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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const enums_1 = require("../common/enums");
const investment_plans_service_1 = require("../investments/investment-plans.service");
const config_service_1 = require("../config/config.service");
let TransactionsService = class TransactionsService {
    constructor(prisma, usersService, investmentPlansService, configService) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.investmentPlansService = investmentPlansService;
        this.configService = configService;
    }
    async create(userId, createTransactionDto) {
        await this.usersService.findOne(userId);
        return this.prisma.transaction.create({
            data: {
                userId,
                type: createTransactionDto.type,
                amount: createTransactionDto.amount,
                asset: createTransactionDto.asset,
                walletAddress: createTransactionDto.walletAddress,
                txHash: createTransactionDto.txHash,
                notes: createTransactionDto.notes,
                status: 'PENDING'
            },
        });
    }
    async findAll(userId, page = 1, limit = 10) {
        if (!Number.isInteger(page) || !Number.isInteger(limit)) {
            page = 1;
            limit = 10;
        }
        const validPage = Math.max(1, page);
        const validLimit = Math.min(100, Math.max(1, limit));
        const [transactions, total] = await Promise.all([
            this.prisma.transaction.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip: (validPage - 1) * validLimit,
                take: validLimit,
            }),
            this.prisma.transaction.count({
                where: { userId },
            }),
        ]);
        return { transactions, total };
    }
    async findOne(userId, id) {
        const transaction = await this.prisma.transaction.findFirst({
            where: { id, userId }
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
    async approveTransaction(id) {
        const transaction = await this.prisma.transaction.findFirst({
            where: { id, status: 'PENDING' }
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Pending transaction not found');
        }
        let planInfo;
        try {
            planInfo = JSON.parse(transaction.notes);
        }
        catch (e) {
            planInfo = null;
        }
        if (transaction.type === 'DEPOSIT') {
            const user = await this.usersService.findOne(transaction.userId);
            if (user.referredBy) {
                const referrer = await this.usersService.findByEmail(user.referredBy);
                const bonusAmount = Number(transaction.amount) * 0.05;
                await this.prisma.transaction.create({
                    data: {
                        userId: referrer.id,
                        type: 'REFERRAL_BONUS',
                        status: 'COMPLETED',
                        amount: bonusAmount,
                        asset: transaction.asset,
                        notes: `Referral bonus from user ${user.email}`,
                        completedAt: new Date(),
                    }
                });
                await this.usersService.update(referrer.id, {
                    referralBonus: referrer.referralBonus + bonusAmount,
                });
            }
            if (planInfo === null || planInfo === void 0 ? void 0 : planInfo.planId) {
                const plan = await this.investmentPlansService.findOne(planInfo.planId);
                const now = new Date();
                const endDate = new Date(now);
                endDate.setDate(endDate.getDate() + plan.duration);
                await this.prisma.investment.create({
                    data: {
                        userId: transaction.userId,
                        planId: planInfo.planId,
                        amount: transaction.amount,
                        returnAmount: transaction.amount * (1 + plan.returnRate / 100),
                        status: enums_1.InvestmentStatus.ACTIVE,
                        startDate: now,
                        endDate,
                        nextPayoutDate: new Date(now.setDate(now.getDate() + 1)),
                    }
                });
            }
        }
        return this.prisma.transaction.update({
            where: { id },
            data: {
                status: 'COMPLETED',
                completedAt: new Date(),
            },
        });
    }
    async rejectTransaction(id) {
        const transaction = await this.prisma.transaction.findFirst({
            where: { id, status: 'PENDING' }
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Pending transaction not found');
        }
        return this.prisma.transaction.update({
            where: { id },
            data: {
                status: 'REJECTED',
            },
        });
    }
    async getUserTransactionStats(userId) {
        const transactions = await this.prisma.transaction.findMany({
            where: { userId, status: 'COMPLETED' },
        });
        const stats = {
            total: {
                deposits: 0,
                withdrawals: 0,
                profits: 0,
                referralBonuses: 0,
                balance: 0
            },
            byAsset: {},
            recentTransactions: await this.prisma.transaction.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                take: 5,
            })
        };
        transactions.forEach(t => {
            const amount = Number(t.amount);
            const asset = t.asset;
            if (!stats.byAsset[asset]) {
                stats.byAsset[asset] = {
                    deposits: 0,
                    withdrawals: 0,
                    profits: 0,
                    referralBonuses: 0,
                    balance: 0
                };
            }
            switch (t.type) {
                case 'DEPOSIT':
                    stats.total.deposits += amount;
                    stats.byAsset[asset].deposits += amount;
                    break;
                case 'WITHDRAWAL':
                    stats.total.withdrawals += amount;
                    stats.byAsset[asset].withdrawals += amount;
                    break;
                case 'PROFIT':
                    stats.total.profits += amount;
                    stats.byAsset[asset].profits += amount;
                    break;
                case 'REFERRAL_BONUS':
                    stats.total.referralBonuses += amount;
                    stats.byAsset[asset].referralBonuses += amount;
                    break;
            }
        });
        stats.total.balance = stats.total.deposits + stats.total.profits +
            stats.total.referralBonuses - stats.total.withdrawals;
        Object.keys(stats.byAsset).forEach(asset => {
            const assetStats = stats.byAsset[asset];
            assetStats.balance = assetStats.deposits + assetStats.profits +
                assetStats.referralBonuses - assetStats.withdrawals;
        });
        return stats;
    }
    async createDepositWithPlan(userId, createDepositDto) {
        const plan = await this.investmentPlansService.findOne(createDepositDto.planId);
        if (!plan.isActive) {
            throw new common_1.BadRequestException('This investment plan is not active');
        }
        if (createDepositDto.amount < plan.minAmount || createDepositDto.amount > plan.maxAmount) {
            throw new common_1.BadRequestException(`Amount must be between ${plan.minAmount} and ${plan.maxAmount}`);
        }
        if (['BTC', 'ETH', 'USDT'].includes(createDepositDto.asset) && !createDepositDto.txHash) {
            throw new common_1.BadRequestException('Transaction hash is required for BTC, ETH, and USDT deposits');
        }
        const walletAddress = this.configService.getWalletAddress(createDepositDto.asset);
        const transaction = await this.prisma.transaction.create({
            data: {
                userId,
                type: enums_1.TransactionType.DEPOSIT,
                status: enums_1.TransactionStatus.PENDING,
                amount: createDepositDto.amount,
                asset: createDepositDto.asset,
                walletAddress: walletAddress,
                txHash: createDepositDto.txHash,
                notes: JSON.stringify({
                    planId: createDepositDto.planId,
                    planName: plan.name,
                    returnRate: plan.returnRate,
                    duration: plan.duration
                })
            }
        });
        return Object.assign(Object.assign({}, transaction), { walletAddress });
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        investment_plans_service_1.InvestmentPlansService,
        config_service_1.ConfigService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map