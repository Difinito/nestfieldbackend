import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        userId: any;
        email: any;
        accessToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        userId: string;
        email: string;
        accessToken: string;
    }>;
}
