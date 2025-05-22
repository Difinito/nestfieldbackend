import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private configService: ConfigService) {
    const isProduction = configService.get('NODE_ENV') === 'production';

    super({
      log: isProduction ? ['error'] : ['query', 'info', 'warn', 'error'],
      errorFormat: isProduction ? 'minimal' : 'colorless',
    });
  }

  async onModuleInit() {
    this.logger.log('Connecting to database...');
    try {
      await this.$connect();
      this.logger.log('Successfully connected to database');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from database...');
    await this.$disconnect();
  }
} 