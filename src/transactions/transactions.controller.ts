import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CreateDepositWithPlanDto } from './dto/create-deposit-with-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Request() req, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(req.user.userId, createTransactionDto);
  }

  @Post('deposit-with-plan')
  @ApiOperation({ summary: 'Create a new deposit with investment plan' })
  @ApiResponse({ status: 201, description: 'The deposit has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createDepositWithPlan(@Request() req, @Body() createDepositDto: CreateDepositWithPlanDto) {
    return this.transactionsService.createDepositWithPlan(req.user.userId, createDepositDto);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.transactionsService.findAll(req.user.userId, parsedPage, parsedLimit);
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