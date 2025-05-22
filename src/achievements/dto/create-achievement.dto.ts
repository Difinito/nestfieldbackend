import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { AchievementType } from '../../common/enums';

export class CreateAchievementDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(AchievementType)
  @IsNotEmpty()
  type: AchievementType;

  @IsNumber()
  @Min(0)
  targetValue: number;
} 