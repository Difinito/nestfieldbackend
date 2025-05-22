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
exports.AdminWithdrawalsController = void 0;
const common_1 = require("@nestjs/common");
const withdrawals_service_1 = require("./withdrawals.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const enums_1 = require("../common/enums");
const swagger_1 = require("@nestjs/swagger");
let AdminWithdrawalsController = class AdminWithdrawalsController {
    constructor(withdrawalsService) {
        this.withdrawalsService = withdrawalsService;
    }
    async findAll() {
        return this.withdrawalsService.findAll();
    }
    async findOne(id) {
        return this.withdrawalsService.findOneAdmin(id);
    }
    async approve(id, transactionHash) {
        return this.withdrawalsService.updateStatus(id, enums_1.TransactionStatus.COMPLETED, transactionHash);
    }
    async reject(id, reason) {
        return this.withdrawalsService.updateStatus(id, enums_1.TransactionStatus.REJECTED, null, reason);
    }
};
exports.AdminWithdrawalsController = AdminWithdrawalsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all withdrawals (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all withdrawals.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminWithdrawalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get withdrawal by ID (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the withdrawal.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Withdrawal not found.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminWithdrawalsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a withdrawal (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The withdrawal has been approved.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Withdrawal not found.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('transactionHash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminWithdrawalsController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a withdrawal (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The withdrawal has been rejected.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Withdrawal not found.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminWithdrawalsController.prototype, "reject", null);
exports.AdminWithdrawalsController = AdminWithdrawalsController = __decorate([
    (0, swagger_1.ApiTags)('admin/withdrawals'),
    (0, common_1.Controller)('admin/withdrawals'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [withdrawals_service_1.WithdrawalsService])
], AdminWithdrawalsController);
//# sourceMappingURL=admin-withdrawals.controller.js.map