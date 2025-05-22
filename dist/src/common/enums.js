"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = exports.CryptoAsset = exports.UserRole = exports.InvestmentStatus = exports.TransactionStatus = exports.TransactionType = exports.AchievementType = void 0;
var AchievementType;
(function (AchievementType) {
    AchievementType["INVESTMENT_COUNT"] = "INVESTMENT_COUNT";
    AchievementType["INVESTMENT_AMOUNT"] = "INVESTMENT_AMOUNT";
    AchievementType["DEPOSIT_AMOUNT"] = "DEPOSIT_AMOUNT";
    AchievementType["REFERRAL_COUNT"] = "REFERRAL_COUNT";
    AchievementType["DAYS_ACTIVE"] = "DAYS_ACTIVE";
})(AchievementType || (exports.AchievementType = AchievementType = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "DEPOSIT";
    TransactionType["WITHDRAWAL"] = "WITHDRAWAL";
    TransactionType["PROFIT"] = "PROFIT";
    TransactionType["REFERRAL_BONUS"] = "REFERRAL_BONUS";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["COMPLETED"] = "COMPLETED";
    TransactionStatus["REJECTED"] = "REJECTED";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var InvestmentStatus;
(function (InvestmentStatus) {
    InvestmentStatus["ACTIVE"] = "ACTIVE";
    InvestmentStatus["COMPLETED"] = "COMPLETED";
    InvestmentStatus["CANCELLED"] = "CANCELLED";
})(InvestmentStatus || (exports.InvestmentStatus = InvestmentStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var CryptoAsset;
(function (CryptoAsset) {
    CryptoAsset["USD"] = "USD";
    CryptoAsset["BTC"] = "BTC";
    CryptoAsset["ETH"] = "ETH";
    CryptoAsset["USDT"] = "USDT";
    CryptoAsset["USDC"] = "USDC";
})(CryptoAsset || (exports.CryptoAsset = CryptoAsset = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["BANK_TRANSFER"] = "BANK_TRANSFER";
    PaymentMethod["CRYPTO"] = "CRYPTO";
    PaymentMethod["PAYPAL"] = "PAYPAL";
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethod["WIRE_TRANSFER"] = "WIRE_TRANSFER";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
//# sourceMappingURL=enums.js.map