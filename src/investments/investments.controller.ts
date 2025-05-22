import { Controller, Get, Post, Body, Param, UseGuards, Request, Put } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { CreateUserInvestmentDto } from './dto/create-user-investment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('investments')
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  create(@Request() req, @Body() createUserInvestmentDto: CreateUserInvestmentDto) {
    return this.investmentsService.create(req.user.userId, createUserInvestmentDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.investmentsService.findAll(req.user.userId);
  }

  @Get('statistics')
  getStatistics(@Request() req) {
    return this.investmentsService.getUserStatistics(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.investmentsService.findOne(req.user.userId, id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id/activate')
  activate(@Param('id') id: string) {
    return this.investmentsService.activateInvestment(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id/complete')
  complete(@Param('id') id: string) {
    return this.investmentsService.completeInvestment(id);
  }
} 