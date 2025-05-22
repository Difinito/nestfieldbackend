import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('withdrawals')
@Controller('withdrawals')
@ApiBearerAuth()
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new withdrawal request' })
  @ApiResponse({ status: 201, description: 'The withdrawal request has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Request() req, @Body() createWithdrawalDto: CreateWithdrawalDto) {
    return this.withdrawalsService.create(req.user.id, createWithdrawalDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all withdrawals for the current user' })
  @ApiResponse({ status: 200, description: 'Return all withdrawals for the current user.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findAll(@Request() req) {
    return this.withdrawalsService.findByUserId(req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get withdrawal by ID' })
  @ApiResponse({ status: 200, description: 'Return the withdrawal.' })
  @ApiResponse({ status: 404, description: 'Withdrawal not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.withdrawalsService.findOne(req.user.id, id);
  }
} 