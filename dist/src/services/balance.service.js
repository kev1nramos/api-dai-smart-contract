"use strict";
/**
 * Module dependencies.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceService = void 0;
const typeorm_config_1 = require("../database/typeorm.config");
const transaction_entity_1 = require("../models/transaction.entity");
/**
 * Get balance by address.
 * @param {ObjectID} address
 * @returns {Promise<IBalance>}
 */
const getBalanceByAddress = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield typeorm_config_1.myDataSource.getRepository(transaction_entity_1.Transaction).createQueryBuilder('transactions')
        .select(['transactions.to', 'transactions.from', 'transactions.balanceAddressFrom', 'transactions.balanceAddressTo'])
        .where('transactions.to = :address OR transactions.from = :address', { address })
        .getOne();
    if (response) {
        return response.to === address ? response.balanceAddressTo : response.balanceAddressFrom;
    }
    return null;
});
/**
 * Export `BalanceService`.
 */
exports.BalanceService = {
    getBalanceByAddress
};
//# sourceMappingURL=balance.service.js.map