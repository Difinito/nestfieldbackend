export enum AchievementType {
  INVESTMENT_COUNT = 'INVESTMENT_COUNT',
  INVESTMENT_AMOUNT = 'INVESTMENT_AMOUNT',
  DEPOSIT_AMOUNT = 'DEPOSIT_AMOUNT',
  REFERRAL_COUNT = 'REFERRAL_COUNT',
  DAYS_ACTIVE = 'DAYS_ACTIVE'
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PROFIT = 'PROFIT',
  REFERRAL_BONUS = 'REFERRAL_BONUS'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

export enum InvestmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum CryptoAsset {
  USD = 'USD',
  BTC = 'BTC',
  ETH = 'ETH',
  USDT = 'USDT',
  USDC = 'USDC'
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CRYPTO = 'CRYPTO',
  PAYPAL = 'PAYPAL',
  CREDIT_CARD = 'CREDIT_CARD',
  WIRE_TRANSFER = 'WIRE_TRANSFER'
} 