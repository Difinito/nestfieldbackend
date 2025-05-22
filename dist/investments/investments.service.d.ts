import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInvestmentDto } from './dto/create-user-investment.dto';
import { UsersService } from '../users/users.service';
export declare class InvestmentsService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    create(userId: string, createUserInvestmentDto: CreateUserInvestmentDto): Promise<{
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
    findAll(userId: string): Promise<({
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
    findOne(userId: string, id: string): Promise<{
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
    activateInvestment(id: string): Promise<{
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
    completeInvestment(id: string): Promise<{
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
    calculateDailyProfits(): Promise<void>;
    getUserStatistics(userId: string): Promise<{
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
}
