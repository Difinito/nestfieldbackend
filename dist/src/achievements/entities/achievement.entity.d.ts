import { User } from '../../users/entities/user.entity';
export declare enum AchievementType {
    INVESTMENT_COUNT = "investment_count",
    INVESTMENT_AMOUNT = "investment_amount",
    DEPOSIT_AMOUNT = "deposit_amount",
    REFERRAL_COUNT = "referral_count",
    DAYS_ACTIVE = "days_active"
}
export declare class Achievement {
    id: string;
    user: User;
    userId: string;
    name: string;
    description: string;
    type: AchievementType;
    targetValue: number;
    currentValue: number;
    isComplete: boolean;
    completedAt: Date;
    createdAt: Date;
}
