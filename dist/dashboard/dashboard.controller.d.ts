import { DashboardService } from './dashboard.service';
import { AccountSummary } from './interfaces/account-summary.interface';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getAccountSummary(req: any): Promise<AccountSummary>;
    getPortfolioAllocation(req: any): Promise<{
        totalInvested: number;
        allocation: import("./interfaces/plan-allocation.interface").PlanAllocation[];
    }>;
    getRecentTransactions(req: any): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.TransactionType;
        status: import(".prisma/client").$Enums.TransactionStatus;
        amount: number;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
        createdAt: Date;
    }[]>;
    getNextPayouts(req: any): Promise<{
        investmentId: string;
        planName: string;
        nextPayoutDate: Date;
        estimatedPayout: number;
    }[]>;
    getAchievements(req: any): Promise<{
        id: string;
        userId: string;
        type: import(".prisma/client").$Enums.AchievementType;
        completedAt: Date | null;
        createdAt: Date;
        name: string;
        description: string;
        targetValue: number;
        currentValue: number;
        isComplete: boolean;
    }[]>;
    getUpcomingEvents(): Promise<{
        id: string;
        createdAt: Date;
        startDate: Date;
        endDate: Date | null;
        description: string;
        isActive: boolean;
        title: string;
    }[]>;
}
