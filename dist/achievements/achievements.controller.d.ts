import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    findAllForUser(req: any): Promise<{
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
    findOne(id: string): Promise<{
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
    }>;
    create(createAchievementDto: CreateAchievementDto): Promise<{
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
    }>;
    update(id: string, updateData: Partial<any>): Promise<{
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
    }>;
    checkAchievements(userId: string): Promise<void>;
}
