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
exports.InvestmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const enums_1 = require("../common/enums");
let InvestmentsService = class InvestmentsService {
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async create(userId, createUserInvestmentDto) {
        const plan = await this.prisma.investmentPlan.findUnique({
            where: { id: createUserInvestmentDto.planId },
        });
        if (!plan) {
            throw new common_1.NotFoundException('Investment plan not found');
        }
        await this.usersService.findOne(userId);
        if (createUserInvestmentDto.amount < plan.minAmount) {
            throw new common_1.BadRequestException(`Minimum investment amount is ${plan.minAmount}`);
        }
        if (plan.maxAmount && createUserInvestmentDto.amount > plan.maxAmount) {
            throw new common_1.BadRequestException(`Maximum investment amount is ${plan.maxAmount}`);
        }
        return this.prisma.investment.create({
            data: {
                userId,
                planId: plan.id,
                amount: createUserInvestmentDto.amount,
                returnAmount: createUserInvestmentDto.amount * (1 + plan.returnRate / 100),
                status: enums_1.InvestmentStatus.ACTIVE,
                startDate: new Date(),
            },
        });
    }
    async findAll(userId) {
        return this.prisma.investment.findMany({
            where: { userId },
            include: { plan: true },
        });
    }
    async findOne(userId, id) {
        const investment = await this.prisma.investment.findFirst({
            where: { id, userId },
            include: { plan: true },
        });
        if (!investment) {
            throw new common_1.NotFoundException('Investment not found');
        }
        return investment;
    }
    async activateInvestment(id) {
        const investment = await this.prisma.investment.findFirst({
            where: { id },
            include: { plan: true },
        });
        if (!investment) {
            throw new common_1.NotFoundException('Investment not found');
        }
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + investment.plan.duration);
        const nextPayoutDate = new Date(now);
        nextPayoutDate.setDate(nextPayoutDate.getDate() + 1);
        return this.prisma.investment.update({
            where: { id },
            data: {
                status: enums_1.InvestmentStatus.ACTIVE,
                startDate: now,
                endDate,
                nextPayoutDate,
            },
        });
    }
    async completeInvestment(id) {
        const investment = await this.prisma.investment.findFirst({
            where: { id, status: 'ACTIVE' },
        });
        if (!investment) {
            throw new common_1.NotFoundException('Active investment not found');
        }
        return this.prisma.investment.update({
            where: { id },
            data: {
                status: 'COMPLETED',
            },
        });
    }
    async calculateDailyProfits() {
        const now = new Date();
        const investments = await this.prisma.investment.findMany({
            where: {
                status: 'ACTIVE',
                nextPayoutDate: {
                    lt: now,
                },
            },
            include: { plan: true },
        });
        for (const investment of investments) {
            const dailyRate = investment.plan.returnRate / 365;
            const dailyProfit = investment.amount * (dailyRate / 100);
            const nextPayoutDate = new Date(investment.nextPayoutDate);
            nextPayoutDate.setDate(nextPayoutDate.getDate() + 1);
            const newStatus = investment.endDate <= now ? 'COMPLETED' : 'ACTIVE';
            await this.prisma.investment.update({
                where: { id: investment.id },
                data: {
                    returnAmount: {
                        increment: dailyProfit,
                    },
                    nextPayoutDate,
                    status: newStatus,
                },
            });
            await this.prisma.transaction.create({
                data: {
                    userId: investment.userId,
                    type: 'PROFIT',
                    status: 'COMPLETED',
                    amount: dailyProfit,
                    asset: 'USD',
                    notes: `Daily profit from ${investment.plan.name} investment`,
                    completedAt: new Date(),
                },
            });
        }
    }
    async getUserStatistics(userId) {
        const [activeInvestments, completedInvestments] = await Promise.all([
            this.prisma.investment.findMany({
                where: {
                    userId,
                    status: 'ACTIVE'
                },
                include: { plan: true },
            }),
            this.prisma.investment.findMany({
                where: {
                    userId,
                    status: 'COMPLETED'
                },
            }),
        ]);
        const totalInvested = activeInvestments.reduce((sum, inv) => sum + Number(inv.amount), 0);
        const totalProfit = [...activeInvestments, ...completedInvestments]
            .reduce((sum, inv) => sum + (Number(inv.returnAmount) - Number(inv.amount)), 0);
        const nextPayouts = activeInvestments.map(inv => ({
            investmentId: inv.id,
            planName: inv.plan.name,
            nextPayoutDate: inv.nextPayoutDate,
            estimatedPayout: Number(inv.amount) * (inv.plan.returnRate / 365 / 100)
        }));
        return {
            totalInvested,
            totalProfit,
            activeInvestments: activeInvestments.length,
            completedInvestments: completedInvestments.length,
            nextPayouts,
        };
    }
};
exports.InvestmentsService = InvestmentsService;
exports.InvestmentsService = InvestmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], InvestmentsService);
//# sourceMappingURL=investments.service.js.map