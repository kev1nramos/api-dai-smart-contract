"use strict";
/**
 * Module dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
/**
 * Constants.
 */
const router = (0, express_1.Router)();
router.route('/list/:page/:limit').get(controllers_1.TransactionController.getTransactions);
router.route('/by/:address').get(controllers_1.TransactionController.getTransactionsByAddress);
/**
 * Export `Transactions` routes.
 */
exports.TransactionRoute = { router };
//# sourceMappingURL=transaction.route.js.map