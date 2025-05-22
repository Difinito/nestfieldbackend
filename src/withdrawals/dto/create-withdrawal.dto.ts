import { IsNotEmpty, IsNumber, IsString, IsEnum, IsObject, ValidateNested, IsOptional } from 'class-validator';
import { CryptoAsset, PaymentMethod } from '../../common/enums';
import { Type } from 'class-transformer';

class BankAccountDetails {
  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsString()
  @IsOptional()
  routingNumber?: string;
}

class CryptoWalletDetails {
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @IsString()
  @IsNotEmpty()
  network: string;
}

export class CreateWithdrawalDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(CryptoAsset)
  @IsNotEmpty()
  currency: CryptoAsset;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Object)
  accountDetails: BankAccountDetails | CryptoWalletDetails;
  
  @IsString()
  @IsOptional()
  notes?: string;
} 