import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInvestmentDto } from './dto/create-user-investment.dto';
import { UsersService } from '../users/users.service';
export declare class InvestmentsService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
    create(userId: string, createUserInvestmentDto: CreateUserInvestmentDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        planId: string;
        amount: number;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        nextPayoutDate: Date | null;
    }>;
    findAll(userId: string): Promise<({
        plan: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            name: string;
            description: string;
            minAmount: number;
            maxAmount: number | null;
            returnRate: number;
            duration: number;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        planId: string;
        amount: number;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        nextPayoutDate: Date | null;
    })[]>;
    findOne(userId: string, id: string): Promise<{
        plan: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            name: string;
            description: string;
            minAmount: number;
            maxAmount: number | null;
            returnRate: number;
            duration: number;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        planId: string;
        amount: number;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        nextPayoutDate: Date | null;
    }>;
    activateInvestment(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        planId: string;
        amount: number;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.InvestmentStatus;
        nextPayoutDate: Date | null;
    }>;
    completeInvestment(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        planId: string;
        amount: number;
        returnAmount: number;
        startDate: Date;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.InvestmentStatus;
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
