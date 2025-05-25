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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const transactions_service_1 = require("../transactions/transactions.service");
const investments_service_1 = require("../investments/investments.service");
const events_service_1 = require("../events/events.service");
const achievements_service_1 = require("../achievements/achievements.service");
const enums_1 = require("../common/enums");
let DashboardService = class DashboardService {
    constructor(usersService, transactionsService, investmentsService, eventsService, achievementsService) {
        this.usersService = usersService;
        this.transactionsService = transactionsService;
        this.investmentsService = investmentsService;
        this.eventsService = eventsService;
        this.achievementsService = achievementsService;
    }
    async getAccountSummary(userId) {
        const user = await this.usersService.findOne(userId);
        const transactionStats = await this.transactionsService.getUserTransactionStats(userId);
        const investmentStats = await this.investmentsService.getUserStatistics(userId);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                referralCode: user.referralCode,
                referralBonus: user.referralBonus,
            },
            balance: transactionStats.total.balance,
            deposits: transactionStats.total.deposits,
            withdrawals: transactionStats.total.withdrawals,
            profits: transactionStats.total.profits,
            referralBonuses: transactionStats.total.referralBonuses,
            activeInvestments: investmentStats.activeInvestments,
            completedInvestments: investmentStats.completedInvestments,
            totalInvested: investmentStats.totalInvested,
            totalProfit: investmentStats.totalProfit,
            assetStats: transactionStats.byAsset,
        };
    }
    async getPortfolioAllocation(userId) {
        const investments = await this.investmentsService.findAll(userId);
        const activeInvestments = investments.filter(inv => inv.status === enums_1.InvestmentStatus.ACTIVE);
        const portfolioByPlan = activeInvestments.reduce((result, inv) => {
            const planName = inv.plan.name;
            if (!result[planName]) {
                result[planName] = {
                    planId: inv.planId,
                    planName: planName,
                    totalAmount: 0,
                    count: 0,
                    percentage: 0,
                };
            }
            result[planName].totalAmount += Number(inv.amount);
            result[planName].count += 1;
            return result;
        }, {});
        const totalInvested = Object.values(portfolioByPlan).reduce((total, plan) => total + plan.totalAmount, 0);
        if (totalInvested > 0) {
            Object.values(portfolioByPlan).forEach((plan) => {
                plan.percentage = (plan.totalAmount / totalInvested) * 100;
            });
        }
        return {
            totalInvested,
            allocation: Object.values(portfolioByPlan),
        };
    }
    async getRecentTransactions(userId) {
        const { transactions } = await this.transactionsService.findAll(userId, 1, 10);
        return transactions;
    }
    async getNextPayouts(userId) {
        const stats = await this.investmentsService.getUserStatistics(userId);
        return stats.nextPayouts;
    }
    async getAchievements(userId) {
        return this.achievementsService.findAll(userId);
    }
    async getUpcomingEvents() {
        return this.eventsService.findUpcoming();
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        transactions_service_1.TransactionsService,
        investments_service_1.InvestmentsService,
        events_service_1.EventsService,
        achievements_service_1.AchievementsService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map