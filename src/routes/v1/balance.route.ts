/**
 * Module dependencies.
 */

import { Router } from 'express';
import { BalanceController } from '../../controllers';

/**
 * Constants.
 */

const router = Router();

router.route('/:address').get(BalanceController.getBalanceByAddress);

/**
 * Export `Balances` routes.
 */

export const BalanceRoute = { router };