import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(registerDto: RegisterDto): Promise<{
        userId: string;
        email: string;
        accessToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        userId: any;
        email: any;
        accessToken: string;
    }>;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        referredBy: string | null;
        referralBonus: number;
        isActive: boolean;
        createdAt: Date;
    }>;
}
