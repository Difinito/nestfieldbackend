import { IsEnum, IsNotEmpty, IsNumber, IsUUID, Min, IsString, IsOptional } from 'class-validator';
import { CryptoAsset } from '../../common/enums';

export class CreateDepositWithPlanDto {
  @IsUUID()
  @IsNotEmpty()
  planId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(CryptoAsset)
  @IsNotEmpty()
  asset: CryptoAsset;

  @IsString()
  @IsOptional()
  walletAddress?: string;

  @IsString()
  @IsOptional()
  txHash?: string;
} 