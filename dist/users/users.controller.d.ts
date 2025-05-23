import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        referredBy: string | null;
        phone: string | null;
        referralBonus: number;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        referredBy: string | null;
        phone: string | null;
        referralBonus: number;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        referredBy: string | null;
        phone: string | null;
        referralBonus: number;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        referredBy: string | null;
        phone: string | null;
        referralBonus: number;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        referralCode: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    remove(id: string): Promise<void>;
}
