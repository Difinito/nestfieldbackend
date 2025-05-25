export interface TransactionStats {
  total: {
    deposits: number;
    withdrawals: number;
    profits: number;
    referralBonuses: number;
    balance: number;
  };
  byAsset: Record<string, {
    deposits: number;
    withdrawals: number;
    profits: number;
    referralBonuses: number;
    balance: number;
  }>;
  recentTransactions: any[];
} 