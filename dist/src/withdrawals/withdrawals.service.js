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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const enums_1 = require("../common/enums");
let WithdrawalsService = class WithdrawalsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createWithdrawalDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const fee = createWithdrawalDto.amount * 0.015;
        const netAmount = createWithdrawalDto.amount - fee;
        const withdrawal = await this.prisma.$transaction(async (tx) => {
            return tx.withdrawal.create({
                data: {
                    userId,
                    amount: createWithdrawalDto.amount,
                    currency: createWithdrawalDto.currency,
                    status: enums_1.TransactionStatus.PENDING,
                    paymentMethod: createWithdrawalDto.paymentMethod,
                    accountDetails: createWithdrawalDto.accountDetails,
                    fee,
                    netAmount,
                    notes: createWithdrawalDto.notes,
                },
            });
        });
        if (withdrawal.paymentMethod === enums_1.PaymentMethod.BANK_TRANSFER) {
            const details = withdrawal.accountDetails;
            if (details.accountNumber) {
                details.accountNumber = '****' + details.accountNumber.slice(-4);
                withdrawal.accountDetails = details;
            }
        }
        return withdrawal;
    }
    async findByUserId(userId) {
        return this.prisma.withdrawal.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(userId, id) {
        const withdrawal = await this.prisma.withdrawal.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException(`Withdrawal with ID ${id} not found`);
        }
        return withdrawal;
    }
    async findAll() {
        return this.prisma.withdrawal.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOneAdmin(id) {
        const withdrawal = await this.prisma.withdrawal.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                    },
                },
            },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException(`Withdrawal with ID ${id} not found`);
        }
        return withdrawal;
    }
    async updateStatus(id, status, transactionHash, notes) {
        const withdrawal = await this.prisma.withdrawal.findUnique({
            where: { id },
        });
        if (!withdrawal) {
            throw new common_1.NotFoundException(`Withdrawal with ID ${id} not found`);
        }
        if (withdrawal.status !== enums_1.TransactionStatus.PENDING) {
            throw new common_1.BadRequestException(`Withdrawal has already been ${withdrawal.status.toLowerCase()}`);
        }
        const updateData = {
            status,
            processedAt: status === enums_1.TransactionStatus.COMPLETED ? new Date() : null,
        };
        if (transactionHash) {
            updateData.transactionHash = transactionHash;
        }
        if (notes) {
            updateData.notes = withdrawal.notes
                ? `${withdrawal.notes}; Admin note: ${notes}`
                : `Admin note: ${notes}`;
        }
        return this.prisma.withdrawal.update({
            where: { id },
            data: updateData,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                }
            }
        });
    }
};
exports.WithdrawalsService = WithdrawalsService;
exports.WithdrawalsService = WithdrawalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WithdrawalsService);
//# sourceMappingURL=withdrawals.service.js.map