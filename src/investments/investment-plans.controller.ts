import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { InvestmentPlansService } from './investment-plans.service';
import { CreateInvestmentPlanDto } from './dto/create-investment-plan.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('investment-plans')
export class InvestmentPlansController {
  constructor(private readonly investmentPlansService: InvestmentPlansService) {}

  @Get()
  findAll() {
    return this.investmentPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investmentPlansService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/all')
  findAllAdmin() {
    return this.investmentPlansService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createInvestmentPlanDto: CreateInvestmentPlanDto) {
    return this.investmentPlansService.create(createInvestmentPlanDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: any) {
    return this.investmentPlansService.update(id, updatePlanDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investmentPlansService.remove(id);
  }
} 