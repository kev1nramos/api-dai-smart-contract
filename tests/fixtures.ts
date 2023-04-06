/**
 * Module dependencies.
 */

import { randomBytes } from "crypto";
import { Transaction } from "../src/models/transaction.entity";
import { faker } from '@faker-js/faker';

export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktldmluIFJhbW9zIiwiY29kZS1jaGFsbGVuZ2UiOiJ0ZXNzZXJhIiwidGVzdCI6IjEiLCJpYXQiOjE1MTYyMzkwMjJ9.Meuy54LyoinuKQZmOIha50siFEUNT39Jr82zzcDBTbU";

/**
 * Load transaction.
 */

function loadTransaction(data = {}) {
  return Object.assign(
    new Transaction({
      hash: randomBytes(32).toString('hex'),
      blockHash: randomBytes(32).toString('hex'),
      blockNumber: faker.datatype.number({ min: 1000000 }),
      balanceAddressFrom: faker.datatype.number({ min: 10000 }).toString(),
      from: faker.finance.ethereumAddress(),
      balanceAddressTo: faker.datatype.number().toString(),
      to: faker.finance.ethereumAddress(),
      value: faker.datatype.number().toString()
    }),
    data,
  );
}

/**
 * Export fixtures.
 */

export default {
  loadTransaction
}