import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEventDto: CreateEventDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }>;
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }[]>;
    findUpcoming(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }>;
    update(id: string, updateEventData: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }>;
    remove(id: string): Promise<void>;
}
