import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateUserInvestmentDto {
  @IsUUID()
  @IsNotEmpty()
  planId: string;

  @IsNumber()
  @Min(0)
  amount: number;
} 