import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        referredBy: string | null;
        referralBonus: number;
        isActive: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        referredBy: string | null;
        referralBonus: number;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        referredBy: string | null;
        referralBonus: number;
        isActive: boolean;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        referredBy: string | null;
        referralBonus: number;
        isActive: boolean;
    }>;
    remove(id: string): Promise<void>;
}
