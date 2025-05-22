import { PrismaService } from '../prisma/prisma.service';
import { CreateInvestmentPlanDto } from './dto/create-investment-plan.dto';
export declare class InvestmentPlansService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createInvestmentPlanDto: CreateInvestmentPlanDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }>;
    findAll(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }[]>;
    findAllAdmin(): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }>;
    update(id: string, updatePlanDto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }>;
    remove(id: string): Promise<void>;
}
