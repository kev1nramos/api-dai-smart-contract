/**
 * Module dependencies.
 */

import { Router } from 'express';
import { TransactionController } from '../../controllers';

/**
 * Constants.
 */

const router = Router();

router.route('/list/:page/:limit').get(TransactionController.getTransactions);
router.route('/by/:address').get(TransactionController.getTransactionsByAddress);

/**
 * Export `Transactions` routes.
 */

export const TransactionRoute = { router };