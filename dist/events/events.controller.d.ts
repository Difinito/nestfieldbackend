import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }[]>;
    findUpcoming(): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }>;
    create(createEventDto: CreateEventDto): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }>;
    update(id: string, updateEventDto: Partial<Event>): Promise<{
        id: string;
        createdAt: Date;
        isActive: boolean;
        description: string;
        startDate: Date;
        endDate: Date | null;
        title: string;
    }>;
    remove(id: string): Promise<void>;
}
