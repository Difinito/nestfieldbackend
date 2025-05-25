import { UsersService } from '../users/users.service';
import { TransactionsService } from '../transactions/transactions.service';
import { InvestmentsService } from '../investments/investments.service';
import { EventsService } from '../events/events.service';
import { AchievementsService } from '../achievements/achievements.service';
import { PlanAllocation } from './interfaces/plan-allocation.interface';
import { AccountSummary } from './interfaces/account-summary.interface';
export declare class DashboardService {
    private readonly usersService;
    private readonly transactionsService;
    private readonly investmentsService;
    private readonly eventsService;
    private readonly achievementsService;
    constructor(usersService: UsersService, transactionsService: TransactionsService, investmentsService: InvestmentsService, eventsService: EventsService, achievementsService: AchievementsService);
    getAccountSummary(userId: string): Promise<AccountSummary>;
    getPortfolioAllocation(userId: string): Promise<{
        totalInvested: number;
        allocation: PlanAllocation[];
    }>;
    getRecentTransactions(userId: string): Promise<{
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
    getNextPayouts(userId: string): Promise<{
        investmentId: string;
        planName: string;
        nextPayoutDate: Date;
        estimatedPayout: number;
    }[]>;
    getAchievements(userId: string): Promise<{
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
