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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInvestment = exports.InvestmentStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const investment_plan_entity_1 = require("./investment-plan.entity");
var InvestmentStatus;
(function (InvestmentStatus) {
    InvestmentStatus["PENDING"] = "pending";
    InvestmentStatus["ACTIVE"] = "active";
    InvestmentStatus["COMPLETED"] = "completed";
    InvestmentStatus["CANCELLED"] = "cancelled";
})(InvestmentStatus || (exports.InvestmentStatus = InvestmentStatus = {}));
let UserInvestment = class UserInvestment {
};
exports.UserInvestment = UserInvestment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserInvestment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.User !== "undefined" && user_entity_1.User) === "function" ? _a : Object)
], UserInvestment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserInvestment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => investment_plan_entity_1.InvestmentPlan),
    (0, typeorm_1.JoinColumn)({ name: 'planId' }),
    __metadata("design:type", investment_plan_entity_1.InvestmentPlan)
], UserInvestment.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserInvestment.prototype, "planId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], UserInvestment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], UserInvestment.prototype, "profit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: InvestmentStatus,
        default: InvestmentStatus.PENDING
    }),
    __metadata("design:type", String)
], UserInvestment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserInvestment.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserInvestment.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], UserInvestment.prototype, "nextPayoutDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserInvestment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserInvestment.prototype, "updatedAt", void 0);
exports.UserInvestment = UserInvestment = __decorate([
    (0, typeorm_1.Entity)('user_investments')
], UserInvestment);
//# sourceMappingURL=user-investment.entity.js.map