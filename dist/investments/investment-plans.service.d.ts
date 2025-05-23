import { PrismaService } from '../prisma/prisma.service';
import { CreateInvestmentPlanDto } from './dto/create-investment-plan.dto';
export declare class InvestmentPlansService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createInvestmentPlanDto: CreateInvestmentPlanDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }>;
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }[]>;
    findAllAdmin(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }>;
    update(id: string, updatePlanDto: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        name: string;
        description: string;
        minAmount: number;
        maxAmount: number | null;
        returnRate: number;
        duration: number;
    }>;
    remove(id: string): Promise<void>;
}
