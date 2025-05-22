import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, TransactionStatus } from '../common/enums';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('admin/withdrawals')
@Controller('admin/withdrawals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminWithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all withdrawals (admin only)' })
  @ApiResponse({ status: 200, description: 'Return all withdrawals.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return this.withdrawalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get withdrawal by ID (admin only)' })
  @ApiResponse({ status: 200, description: 'Return the withdrawal.' })
  @ApiResponse({ status: 404, description: 'Withdrawal not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: string) {
    return this.withdrawalsService.findOneAdmin(id);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a withdrawal (admin only)' })
  @ApiResponse({ status: 200, description: 'The withdrawal has been approved.' })
  @ApiResponse({ status: 404, description: 'Withdrawal not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async approve(
    @Param('id') id: string, 
    @Body('transactionHash') transactionHash?: string
  ) {
    return this.withdrawalsService.updateStatus(id, TransactionStatus.COMPLETED, transactionHash);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a withdrawal (admin only)' })
  @ApiResponse({ status: 200, description: 'The withdrawal has been rejected.' })
  @ApiResponse({ status: 404, description: 'Withdrawal not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async reject(
    @Param('id') id: string,
    @Body('reason') reason?: string
  ) {
    return this.withdrawalsService.updateStatus(id, TransactionStatus.REJECTED, null, reason);
  }
} 