"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentsModule = void 0;
const common_1 = require("@nestjs/common");
const investments_controller_1 = require("./investments.controller");
const investments_service_1 = require("./investments.service");
const investment_plans_controller_1 = require("./investment-plans.controller");
const investment_plans_service_1 = require("./investment-plans.service");
const users_module_1 = require("../users/users.module");
let InvestmentsModule = class InvestmentsModule {
};
exports.InvestmentsModule = InvestmentsModule;
exports.InvestmentsModule = InvestmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule
        ],
        controllers: [investments_controller_1.InvestmentsController, investment_plans_controller_1.InvestmentPlansController],
        providers: [investments_service_1.InvestmentsService, investment_plans_service_1.InvestmentPlansService],
        exports: [investments_service_1.InvestmentsService, investment_plans_service_1.InvestmentPlansService],
    })
], InvestmentsModule);
//# sourceMappingURL=investments.module.js.map