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
let TransactionsService = class TransactionsService {
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
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
        const [transactions, total] = await Promise.all([
            this.prisma.transaction.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
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
        const deposits = transactions
            .filter(t => t.type === 'DEPOSIT')
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const withdrawals = transactions
            .filter(t => t.type === 'WITHDRAWAL')
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const profits = transactions
            .filter(t => t.type === 'PROFIT')
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const referralBonuses = transactions
            .filter(t => t.type === 'REFERRAL_BONUS')
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const balance = deposits + profits + referralBonuses - withdrawals;
        const recentTransactions = await this.prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        return {
            deposits,
            withdrawals,
            profits,
            referralBonuses,
            balance,
            recentTransactions,
        };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map