import { User } from '../../users/entities/user.entity';
import { InvestmentPlan } from './investment-plan.entity';
export declare enum InvestmentStatus {
    PENDING = "pending",
    ACTIVE = "active",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class UserInvestment {
    id: string;
    user: User;
    userId: string;
    plan: InvestmentPlan;
    planId: string;
    amount: number;
    profit: number;
    status: InvestmentStatus;
    startDate: Date;
    endDate: Date;
    nextPayoutDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
