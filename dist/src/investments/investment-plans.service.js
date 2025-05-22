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
exports.InvestmentPlansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InvestmentPlansService = class InvestmentPlansService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createInvestmentPlanDto) {
        const newPlan = this.prisma.investmentPlan.create({
            data: {
                name: createInvestmentPlanDto.name,
                description: createInvestmentPlanDto.description,
                minAmount: createInvestmentPlanDto.minAmount,
                maxAmount: createInvestmentPlanDto.maxAmount,
                returnRate: createInvestmentPlanDto.interestRate,
                duration: createInvestmentPlanDto.durationDays,
                isActive: true
            },
        });
        return newPlan;
    }
    async findAll() {
        return this.prisma.investmentPlan.findMany({ where: { isActive: true } });
    }
    async findAllAdmin() {
        return this.prisma.investmentPlan.findMany();
    }
    async findOne(id) {
        const plan = await this.prisma.investmentPlan.findUnique({ where: { id } });
        if (!plan) {
            throw new common_1.NotFoundException('Investment plan not found');
        }
        return plan;
    }
    async update(id, updatePlanDto) {
        const plan = await this.findOne(id);
        Object.assign(plan, updatePlanDto);
        return this.prisma.investmentPlan.update({ where: { id }, data: plan });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.investmentPlan.delete({ where: { id } });
    }
};
exports.InvestmentPlansService = InvestmentPlansService;
exports.InvestmentPlansService = InvestmentPlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvestmentPlansService);
//# sourceMappingURL=investment-plans.service.js.map