"use strict";
/**
 * Module dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_route_1 = require("./transaction.route");
const balance_route_1 = require("./balance.route");
/**
 * Constants.
 */
const router = (0, express_1.Router)();
const publicRoutes = [
    {
        path: '/transactions',
        route: transaction_route_1.TransactionRoute.router,
    },
    {
        path: '/balances',
        route: balance_route_1.BalanceRoute.router
    }
];
// Expose routes based on public routes array.
publicRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
/**
 * Export router.
 */
exports.default = router;
//# sourceMappingURL=index.js.map