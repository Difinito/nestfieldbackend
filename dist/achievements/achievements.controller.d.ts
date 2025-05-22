import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    findAllForUser(req: any): Promise<{
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
    findOne(id: string): Promise<{
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
    }>;
    create(createAchievementDto: CreateAchievementDto): Promise<{
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
    }>;
    update(id: string, updateData: Partial<any>): Promise<{
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
    }>;
    checkAchievements(userId: string): Promise<void>;
}
