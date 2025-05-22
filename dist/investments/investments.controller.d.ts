import { InvestmentsService } from './investments.service';
import { CreateUserInvestmentDto } from './dto/create-user-investment.dto';
export declare class InvestmentsController {
    private readonly investmentsService;
    constructor(investmentsService: InvestmentsService);
    create(req: any, createUserInvestmentDto: CreateUserInvestmentDto): Promise<{
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        createdAt: Date;
        planId: string;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        nextPayoutDate: Date | null;
    }>;
    findAll(req: any): Promise<({
        plan: {
            name: string;
            id: string;
            createdAt: Date;
            isActive: boolean;
            description: string;
            minAmount: number;
            maxAmount: number | null;
            returnRate: number;
            duration: number;
        };
    } & {
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        createdAt: Date;
        planId: string;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        nextPayoutDate: Date | null;
    })[]>;
    getStatistics(req: any): Promise<{
        totalInvested: number;
        totalProfit: number;
        activeInvestments: number;
        completedInvestments: number;
        nextPayouts: {
            investmentId: string;
            planName: string;
            nextPayoutDate: Date;
            estimatedPayout: number;
        }[];
    }>;
    findOne(req: any, id: string): Promise<{
        plan: {
            name: string;
            id: string;
            createdAt: Date;
            isActive: boolean;
            description: string;
            minAmount: number;
            maxAmount: number | null;
            returnRate: number;
            duration: number;
        };
    } & {
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        createdAt: Date;
        planId: string;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        nextPayoutDate: Date | null;
    }>;
    activate(id: string): Promise<{
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        createdAt: Date;
        planId: string;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        nextPayoutDate: Date | null;
    }>;
    complete(id: string): Promise<{
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        createdAt: Date;
        planId: string;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        nextPayoutDate: Date | null;
    }>;
}
