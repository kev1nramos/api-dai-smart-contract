"use strict";
/**
 * Module dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
/**
 * Constants.
 */
const router = (0, express_1.Router)();
router.route('/:address').get(controllers_1.BalanceController.getBalanceByAddress);
/**
 * Export `Balances` routes.
 */
exports.BalanceRoute = { router };
//# sourceMappingURL=balance.route.js.map