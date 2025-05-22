import { PrismaService } from '../prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UsersService } from '../users/users.service';
import { AchievementType } from '../common/enums';
export declare class AchievementsService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
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
    findAll(userId: string): Promise<{
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
    update(id: string, updateData: any): Promise<{
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
    updateProgress(userId: string, type: AchievementType, value: number): Promise<void>;
    checkAchievements(userId: string): Promise<void>;
}
