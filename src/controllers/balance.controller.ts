/**
 * Module dependencies.
 */

import { BalanceService } from "../services";
import { Logger } from "../config";
import { Request, Response } from "express";

const getBalanceByAddress = async (req: Request, res: Response) => {
  const { address } = req.params;
  Logger.info(`Request started - /balances/${address}`);
  const balances = await BalanceService.getBalanceByAddress(address);
  if (!balances) {
    Logger.error('No balances were found for this address.')
    return res.status(404).send('Not found.');
  };
  return res.status(200).json({ address, balance: balances });
}

/**
 * Export `BalanceController`.
 */

export const BalanceController = {
  getBalanceByAddress
}