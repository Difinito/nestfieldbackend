import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getAccountSummary(req: any): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            referralCode: string;
            referralBonus: number;
        };
        balance: number;
        deposits: number;
        withdrawals: number;
        profits: number;
        referralBonuses: number;
        activeInvestments: number;
        completedInvestments: number;
        totalInvested: number;
        totalProfit: number;
    }>;
    getPortfolioAllocation(req: any): Promise<{
        totalInvested: number;
        allocation: import("./interfaces/plan-allocation.interface").PlanAllocation[];
    }>;
    getRecentTransactions(req: any): Promise<{
        id: string;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        notes: string | null;
        createdAt: Date;
        type: import(".prisma/client").$Enums.TransactionType;
        completedAt: Date | null;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
    }[]>;
    getNextPayouts(req: any): Promise<{
        investmentId: string;
        planName: string;
        nextPayoutDate: Date;
        estimatedPayout: number;
    }[]>;
    getAchievements(req: any): Promise<{
        name: string;
        id: string;
        userId: string;
        createdAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.AchievementType;
        targetValue: number;
        currentValue: number;
        isComplete: boolean;
        completedAt: Date | null;
    }[]>;
    getUpcomingEvents(): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }[]>;
}
