import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(req.user.userId, createTransactionDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.transactionsService.findAll(req.user.userId, page, limit);
  }

  @Get('stats')
  getStats(@Request() req) {
    return this.transactionsService.getUserTransactionStats(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.transactionsService.findOne(req.user.userId, id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id/approve')
  approve(@Param('id') id: string) {
    return this.transactionsService.approveTransaction(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id/reject')
  reject(@Param('id') id: string) {
    return this.transactionsService.rejectTransaction(id);
  }
} 