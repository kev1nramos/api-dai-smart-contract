/**
 * Module dependencies.
 */

import { Request, Response } from 'express';
import { TransactionService } from '../services';
import { Logger } from '../config';

const getTransactions = async (req: Request, res: Response) => {
    let { page, limit } = req.params;
    const [pageNumber, limitNumber] = [+page, +limit];
    Logger.info(`Request started - /transactions with page ${page} and limit ${limit}`);
    const result = await TransactionService.getTransactions({ page: pageNumber, limit: limitNumber });
    if (!result.transactions || !result.transactions.length) {
      Logger.error('No transactions were found.')
      return res.status(404).send('Not found.');
    };
    return res.status(200).json(result);
}

const getTransactionsByAddress = async (req: Request, res: Response) => {
  const { address } = req.params;
  Logger.info(`Request started - /transactions/${address}`);
  const transactions = await TransactionService.getTransactionsBy(address);
  if (!transactions || !transactions.length) {
    Logger.error('No transactions were found for this address.')
    return res.status(404).send('Not found.');
  };
  return res.status(200).json(transactions);
}

/**
 * Export `TransactionController`.
 */

export const TransactionController = {
  getTransactions,
  getTransactionsByAddress
}