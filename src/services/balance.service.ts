/**
 * Module dependencies.
 */

import { myDataSource } from "../database/typeorm.config";
import { Transaction } from "../models/transaction.entity";

/**
 * Get balance by address.
 * @param {ObjectID} address
 * @returns {Promise<IBalance>}
 */

const getBalanceByAddress = async (address: string) => {
  const response = await myDataSource.getRepository(Transaction).createQueryBuilder('transactions')
    .select(['transactions.to', 'transactions.from', 'transactions.balanceAddressFrom', 'transactions.balanceAddressTo'])
    .where('transactions.to = :address OR transactions.from = :address', { address })
    .getOne();

  if (response) {
    return response.to === address ? response.balanceAddressTo : response.balanceAddressFrom;
  }
  return null;
}


/**
 * Export `BalanceService`.
 */

export const BalanceService = {
  getBalanceByAddress
}