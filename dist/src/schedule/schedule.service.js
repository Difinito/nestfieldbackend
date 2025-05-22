"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ScheduleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const investments_service_1 = require("../investments/investments.service");
let ScheduleService = ScheduleService_1 = class ScheduleService {
    constructor(investmentsService) {
        this.investmentsService = investmentsService;
        this.logger = new common_1.Logger(ScheduleService_1.name);
    }
    async calculateDailyProfits() {
        this.logger.log('Calculating daily profits for all active investments');
        try {
            await this.investmentsService.calculateDailyProfits();
            this.logger.log('Daily profits calculation completed successfully');
        }
        catch (error) {
            this.logger.error('Error calculating daily profits', error.stack);
        }
    }
};
exports.ScheduleService = ScheduleService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScheduleService.prototype, "calculateDailyProfits", null);
exports.ScheduleService = ScheduleService = ScheduleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [investments_service_1.InvestmentsService])
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map