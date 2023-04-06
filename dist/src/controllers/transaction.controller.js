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
exports.TransactionController = void 0;
const services_1 = require("../services");
const config_1 = require("../config");
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page, limit } = req.params;
    const [pageNumber, limitNumber] = [+page, +limit];
    config_1.Logger.info(`Request started - /transactions with page ${page} and limit ${limit}`);
    const result = yield services_1.TransactionService.getTransactions({ page: pageNumber, limit: limitNumber });
    if (!result.transactions || !result.transactions.length) {
        config_1.Logger.error('No transactions were found.');
        return res.status(404).send('Not found.');
    }
    ;
    return res.status(200).json(result);
});
const getTransactionsByAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.params;
    config_1.Logger.info(`Request started - /transactions/${address}`);
    const transactions = yield services_1.TransactionService.getTransactionsBy(address);
    if (!transactions || !transactions.length) {
        config_1.Logger.error('No transactions were found for this address.');
        return res.status(404).send('Not found.');
    }
    ;
    return res.status(200).json(transactions);
});
/**
 * Export `TransactionController`.
 */
exports.TransactionController = {
    getTransactions,
    getTransactionsByAddress
};
//# sourceMappingURL=transaction.controller.js.map