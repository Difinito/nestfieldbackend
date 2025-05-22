import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      where: { isActive: true },
      orderBy: { startDate: 'asc' },
    });
  }

  async findUpcoming() {
    const now = new Date();
    return this.prisma.event.findMany({
      where: {
        isActive: true,
        startDate: {
          gte: now,
        },
      },
      orderBy: { startDate: 'asc' },
      take: 5,
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    
    return event;
  }

  async update(id: string, updateEventData: any) {
    await this.findOne(id);
    
    return this.prisma.event.update({
      where: { id },
      data: updateEventData,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    
    await this.prisma.event.delete({
      where: { id },
    });
  }
} 