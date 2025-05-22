export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    twoFactorSecret?: string;
    twoFactorEnabled: boolean;
    phone?: string;
    referralCode: string;
    referredBy?: string;
    referralBonus: number;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
