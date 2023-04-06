/**
 * Module dependencies.
 */

import { Router } from 'express';
import { TransactionRoute } from './transaction.route';
import { BalanceRoute } from './balance.route';


/**
 * Constants.
 */

const router = Router();

const publicRoutes = [
  {
    path: '/transactions',
    route: TransactionRoute.router,
  },
  {
    path: '/balances',
    route: BalanceRoute.router
  }
];


// Expose routes based on public routes array.
publicRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/**
 * Export router.
 */

export default router;