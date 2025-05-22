"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWithdrawalDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_withdrawal_dto_1 = require("./create-withdrawal.dto");
class UpdateWithdrawalDto extends (0, mapped_types_1.PartialType)(create_withdrawal_dto_1.CreateWithdrawalDto) {
}
exports.UpdateWithdrawalDto = UpdateWithdrawalDto;
//# sourceMappingURL=update-withdrawal.dto.js.map