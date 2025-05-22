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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalsController = void 0;
const common_1 = require("@nestjs/common");
const withdrawals_service_1 = require("./withdrawals.service");
const create_withdrawal_dto_1 = require("./dto/create-withdrawal.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let WithdrawalsController = class WithdrawalsController {
    constructor(withdrawalsService) {
        this.withdrawalsService = withdrawalsService;
    }
    async create(req, createWithdrawalDto) {
        return this.withdrawalsService.create(req.user.id, createWithdrawalDto);
    }
    async findAll(req) {
        return this.withdrawalsService.findByUserId(req.user.id);
    }
    async findOne(req, id) {
        return this.withdrawalsService.findOne(req.user.id, id);
    }
};
exports.WithdrawalsController = WithdrawalsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new withdrawal request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The withdrawal request has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_withdrawal_dto_1.CreateWithdrawalDto]),
    __metadata("design:returntype", Promise)
], WithdrawalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get all withdrawals for the current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all withdrawals for the current user.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WithdrawalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get withdrawal by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the withdrawal.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Withdrawal not found.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WithdrawalsController.prototype, "findOne", null);
exports.WithdrawalsController = WithdrawalsController = __decorate([
    (0, swagger_1.ApiTags)('withdrawals'),
    (0, common_1.Controller)('withdrawals'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [withdrawals_service_1.WithdrawalsService])
], WithdrawalsController);
//# sourceMappingURL=withdrawals.controller.js.map