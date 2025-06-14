"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let AchievementsService = class AchievementsService {
    constructor(prisma, usersService) {
        this.prisma = prisma;
        this.usersService = usersService;
    }
    async create(createAchievementDto) {
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
    async findAll(userId) {
        return this.prisma.achievement.findMany({
            where: { userId },
            orderBy: [
                { isComplete: 'asc' },
                { type: 'asc' }
            ]
        });
    }
    async findOne(id) {
        const achievement = await this.prisma.achievement.findUnique({
            where: { id }
        });
        if (!achievement) {
            throw new common_1.NotFoundException('Achievement not found');
        }
        return achievement;
    }
    async update(id, updateData) {
        const achievement = await this.findOne(id);
        if (updateData.isComplete && !achievement.completedAt) {
            updateData.completedAt = new Date();
        }
        return this.prisma.achievement.update({
            where: { id },
            data: updateData,
        });
    }
    async updateProgress(userId, type, value) {
        const achievements = await this.prisma.achievement.findMany({
            where: {
                userId,
                type,
                isComplete: false
            }
        });
        for (const achievement of achievements) {
            const isComplete = value >= achievement.targetValue;
            await this.prisma.achievement.update({
                where: { id: achievement.id },
                data: Object.assign({ currentValue: value, isComplete }, (isComplete ? { completedAt: new Date() } : {}))
            });
        }
    }
    async checkAchievements(userId) {
    }
};
exports.AchievementsService = AchievementsService;
exports.AchievementsService = AchievementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService])
], AchievementsService);
//# sourceMappingURL=achievements.service.js.map