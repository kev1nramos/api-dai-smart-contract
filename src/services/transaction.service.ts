/**
 * Module dependencies.
 */

import { myDataSource } from "../database/typeorm.config";
import { ITransaction, Transaction } from "../models/transaction.entity";

/**
 * Constants.
 */

/**
 * Create transaction.
 * @returns {Promise<ITransaction>}
 */

const createTransaction = (transactionDTO): Promise<Transaction> => {
  const transaction = new Transaction(transactionDTO);
  return myDataSource.transaction(async (transactionEntityManager) => {
    return await transactionEntityManager.getRepository(Transaction).save(transaction);
  });
}

/**
 * Get transactions.
 * @returns {Promise<ITransaction>}
 */

const getTransactions = async ({ page, limit } = { page: 0, limit: 100 }): Promise<ITransaction> => {
  page = page === 0 ? 1 : page;
  const [transactions, total] = await myDataSource.transaction(async (transactionEntityManager) => {
    return await transactionEntityManager.getRepository(Transaction).findAndCount({ skip: (page - 1) * limit, take: limit, order: { updatedAt: 'DESC' } });
  })

  return {
    transactions,
    total,
    page,
    limit
  };
}

/**
 * Get transactions by address.
 * @param  address
 * @returns {Promise<ITransaction>}
 */

const getTransactionsBy = async (address: string): Promise<Transaction[]> => {
  const response = await myDataSource.getRepository(Transaction).createQueryBuilder('transactions')
  .where('transactions.to = :address OR transactions.from = :address', { address })
  .getMany();

  return response;
}

/**
 * Export `TransactionService`.
 */

export const TransactionService = {
  createTransaction,
  getTransactions,
  getTransactionsBy
}