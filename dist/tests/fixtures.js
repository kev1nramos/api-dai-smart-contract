"use strict";
/**
 * Module dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const crypto_1 = require("crypto");
const transaction_entity_1 = require("../src/models/transaction.entity");
const faker_1 = require("@faker-js/faker");
exports.authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktldmluIFJhbW9zIiwiY29kZS1jaGFsbGVuZ2UiOiJ0ZXNzZXJhIiwidGVzdCI6IjEiLCJpYXQiOjE1MTYyMzkwMjJ9.Meuy54LyoinuKQZmOIha50siFEUNT39Jr82zzcDBTbU";
/**
 * Load transaction.
 */
function loadTransaction(data = {}) {
    return Object.assign(new transaction_entity_1.Transaction({
        hash: (0, crypto_1.randomBytes)(32).toString('hex'),
        blockHash: (0, crypto_1.randomBytes)(32).toString('hex'),
        blockNumber: faker_1.faker.datatype.number({ min: 1000000 }),
        balanceAddressFrom: faker_1.faker.datatype.number({ min: 10000 }).toString(),
        from: faker_1.faker.finance.ethereumAddress(),
        balanceAddressTo: faker_1.faker.datatype.number().toString(),
        to: faker_1.faker.finance.ethereumAddress(),
        value: faker_1.faker.datatype.number().toString()
    }), data);
}
/**
 * Export fixtures.
 */
exports.default = {
    loadTransaction
};
//# sourceMappingURL=fixtures.js.map