import { AchievementType } from '../../common/enums';
export declare class CreateAchievementDto {
    userId: string;
    name: string;
    description: string;
    type: AchievementType;
    targetValue: number;
}
