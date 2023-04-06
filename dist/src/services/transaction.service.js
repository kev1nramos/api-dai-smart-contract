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
exports.TransactionService = void 0;
const typeorm_config_1 = require("../database/typeorm.config");
const transaction_entity_1 = require("../models/transaction.entity");
/**
 * Constants.
 */
/**
 * Create transaction.
 * @returns {Promise<ITransaction>}
 */
const createTransaction = (transactionDTO) => {
    const transaction = new transaction_entity_1.Transaction(transactionDTO);
    return typeorm_config_1.myDataSource.transaction((transactionEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        return yield transactionEntityManager.getRepository(transaction_entity_1.Transaction).save(transaction);
    }));
};
/**
 * Get transactions.
 * @returns {Promise<ITransaction>}
 */
const getTransactions = ({ page, limit } = { page: 0, limit: 100 }) => __awaiter(void 0, void 0, void 0, function* () {
    page = page === 0 ? 1 : page;
    const [transactions, total] = yield typeorm_config_1.myDataSource.transaction((transactionEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
        return yield transactionEntityManager.getRepository(transaction_entity_1.Transaction).findAndCount({ skip: (page - 1) * limit, take: limit, order: { updatedAt: 'DESC' } });
    }));
    return {
        transactions,
        total,
        page,
        limit
    };
});
/**
 * Get transactions by address.
 * @param  address
 * @returns {Promise<ITransaction>}
 */
const getTransactionsBy = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield typeorm_config_1.myDataSource.getRepository(transaction_entity_1.Transaction).createQueryBuilder('transactions')
        .where('transactions.to = :address OR transactions.from = :address', { address })
        .getMany();
    return response;
});
/**
 * Export `TransactionService`.
 */
exports.TransactionService = {
    createTransaction,
    getTransactions,
    getTransactionsBy
};
//# sourceMappingURL=transaction.service.js.map