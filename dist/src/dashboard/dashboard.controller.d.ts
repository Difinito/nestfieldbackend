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
        createdAt: Date;
        userId: string;
        amount: number;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
    }[]>;
    getNextPayouts(req: any): Promise<{
        investmentId: string;
        planName: string;
        nextPayoutDate: Date;
        estimatedPayout: number;
    }[]>;
    getAchievements(req: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        userId: string;
        type: import(".prisma/client").$Enums.AchievementType;
        completedAt: Date | null;
        targetValue: number;
        currentValue: number;
        isComplete: boolean;
    }[]>;
    getUpcomingEvents(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }[]>;
}
