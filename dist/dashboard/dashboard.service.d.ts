import { UsersService } from '../users/users.service';
import { TransactionsService } from '../transactions/transactions.service';
import { InvestmentsService } from '../investments/investments.service';
import { EventsService } from '../events/events.service';
import { AchievementsService } from '../achievements/achievements.service';
import { PlanAllocation } from './interfaces/plan-allocation.interface';
export declare class DashboardService {
    private readonly usersService;
    private readonly transactionsService;
    private readonly investmentsService;
    private readonly eventsService;
    private readonly achievementsService;
    constructor(usersService: UsersService, transactionsService: TransactionsService, investmentsService: InvestmentsService, eventsService: EventsService, achievementsService: AchievementsService);
    getAccountSummary(userId: string): Promise<{
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
    getPortfolioAllocation(userId: string): Promise<{
        totalInvested: number;
        allocation: PlanAllocation[];
    }>;
    getRecentTransactions(userId: string): Promise<{
        id: string;
        createdAt: Date;
        amount: number;
        userId: string;
        status: import(".prisma/client").$Enums.TransactionStatus;
        type: import(".prisma/client").$Enums.TransactionType;
        asset: import(".prisma/client").$Enums.CryptoAsset;
        walletAddress: string | null;
        txHash: string | null;
        notes: string | null;
        completedAt: Date | null;
    }[]>;
    getNextPayouts(userId: string): Promise<{
        investmentId: string;
        planName: string;
        nextPayoutDate: Date;
        estimatedPayout: number;
    }[]>;
    getAchievements(userId: string): Promise<{
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
