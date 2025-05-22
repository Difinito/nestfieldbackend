import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvestmentPlanDto } from './dto/create-investment-plan.dto';

@Injectable()
export class InvestmentPlansService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createInvestmentPlanDto: CreateInvestmentPlanDto) {
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

  async findOne(id: string) {
    const plan = await this.prisma.investmentPlan.findUnique({ where: { id } });
    if (!plan) {
      throw new NotFoundException('Investment plan not found');
    }
    return plan;
  }

  async update(id: string, updatePlanDto: any) {
    const plan = await this.findOne(id);
    Object.assign(plan, updatePlanDto);
    return this.prisma.investmentPlan.update({ where: { id }, data: plan });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // This will throw if the plan doesn't exist
    await this.prisma.investmentPlan.delete({ where: { id } });
  }
} 