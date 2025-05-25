export interface AccountSummary {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    referralCode: string;
    referralBonus: number;
  };
  balance: number;
  deposits: number;
  withdrawals: number;
  profits: number;
  referralBonuses: number;
  activeInvestments: number;
  completedInvestments: number;
  totalInvested: number;
  totalProfit: number;
  assetStats: Record<string, {
    deposits: number;
    withdrawals: number;
    profits: number;
    referralBonuses: number;
    balance: number;
  }>;
} 