import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UsersService } from '../users/users.service';
import { AchievementType } from '../common/enums';


@Injectable()
export class AchievementsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}


  async create(createAchievementDto: CreateAchievementDto) {
    // Verify user exists
    await this.usersService.findOne(createAchievementDto.userId);
    
    return this.prisma.achievement.create({
      data: {
        userId: createAchievementDto.userId,
        name: createAchievementDto.name,
        description: createAchievementDto.description,
        type: createAchievementDto.type,
        targetValue: createAchievementDto.targetValue,
        currentValue: 0,
        isComplete: false
      }
    });
  }

  async findAll(userId: string) {
    return this.prisma.achievement.findMany({ 
      where: { userId },
      orderBy: [
        { isComplete: 'asc' },
        { type: 'asc' }
      ]
    });
  }

  async findOne(id: string) {
    const achievement = await this.prisma.achievement.findUnique({
      where: { id }
    });
    
    if (!achievement) {
      throw new NotFoundException('Achievement not found');
    }
    
    return achievement;
  }

  async update(id: string, updateData: any) {
    const achievement = await this.findOne(id);
    
    // If achievement is complete and completedAt isn't set, set it now
    if (updateData.isComplete && !achievement.completedAt) {
      updateData.completedAt = new Date();
    }
    
    return this.prisma.achievement.update({
      where: { id },
      data: updateData,
    });
  }

  async updateProgress(userId: string, type: AchievementType, value: number): Promise<void> {
    const achievements = await this.prisma.achievement.findMany({
      where: {
        userId,
        type,
        isComplete: false
      }
    });

    for (const achievement of achievements) {
      // Check if achievement is complete
      const isComplete = value >= achievement.targetValue;
      
      await this.prisma.achievement.update({
        where: { id: achievement.id },
        data: {
          currentValue: value,
          isComplete,
          ...(isComplete ? { completedAt: new Date() } : {})
        }
      });
    }
  }

  async checkAchievements(userId: string): Promise<void> {
    // This would be implemented with the actual services to check various metrics
    // For example, checking investment counts, deposit totals, etc.
    // You would inject the necessary services (TransactionsService, InvestmentsService)
    // For now, this is a placeholder for the implementation
  }
} 