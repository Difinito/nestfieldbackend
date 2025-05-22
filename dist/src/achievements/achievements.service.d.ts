import { PrismaService } from '../prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UsersService } from '../users/users.service';
import { AchievementType } from '../common/enums';
export declare class AchievementsService {
    private prisma;
    private usersService;
    constructor(prisma: PrismaService, usersService: UsersService);
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
    findAll(userId: string): Promise<{
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
    update(id: string, updateData: any): Promise<{
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
    updateProgress(userId: string, type: AchievementType, value: number): Promise<void>;
    checkAchievements(userId: string): Promise<void>;
}
