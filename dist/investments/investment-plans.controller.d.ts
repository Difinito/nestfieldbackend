import { InvestmentPlansService } from './investment-plans.service';
import { CreateInvestmentPlanDto } from './dto/create-investment-plan.dto';
export declare class InvestmentPlansController {
    private readonly investmentPlansService;
    constructor(investmentPlansService: InvestmentPlansService);
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
