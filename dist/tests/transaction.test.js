"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const typeorm_config_1 = require("../src/database/typeorm.config");
const fixtures_1 = __importStar(require("./fixtures"));
describe('transactionsAPI', () => {
    const transactions = [
        fixtures_1.default.loadTransaction(),
        fixtures_1.default.loadTransaction(),
        fixtures_1.default.loadTransaction(),
        fixtures_1.default.loadTransaction(),
        fixtures_1.default.loadTransaction(),
    ];
    describe('getTransactions', () => {
        const result = {
            transactions,
            page: 1,
            limit: 10,
        };
        it('should return transactions with page and limit', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetTransactions = jest.fn(() => [transactions]);
            jest
                .spyOn(typeorm_config_1.myDataSource, 'transaction')
                .mockImplementation(() => mockGetTransactions());
            const page = 1, limit = 10;
            const res = yield (0, supertest_1.default)(app_1.default)
                .get(`/v1/transactions/list/${page}/${limit}`)
                .set('Authorization', `Bearer ${fixtures_1.authToken}`);
            expect(mockGetTransactions).toHaveBeenCalledTimes(1);
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text)).toEqual(result);
        }));
        it('should return a 404 status code when there are no transactions', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockGetTransactions = jest.fn(() => []);
            jest
                .spyOn(typeorm_config_1.myDataSource, 'transaction')
                .mockImplementation(() => mockGetTransactions());
            const page = 1, limit = 10;
            const res = yield (0, supertest_1.default)(app_1.default)
                .get(`/v1/transactions/list/${page}/${limit}`)
                .set('Authorization', `Bearer ${fixtures_1.authToken}`);
            expect(mockGetTransactions).toHaveBeenCalledTimes(1);
            expect(res.status).toEqual(404);
            expect(res.text).toEqual('Not found.');
        }));
    });
    describe('getTransactionsByAddress', () => {
        it('should return transactions by address', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(typeorm_config_1.myDataSource, 'getRepository').mockImplementation(() => {
                const original = jest.requireActual('typeorm');
                return Object.assign(Object.assign({}, original), { createQueryBuilder: jest.fn().mockImplementation(() => ({
                        subQuery: jest.fn().mockReturnThis(),
                        from: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        select: jest.fn().mockReturnThis(),
                        getQuery: jest.fn().mockReturnThis(),
                        setParameter: jest.fn().mockReturnThis(),
                        getMany: jest.fn().mockResolvedValue(transactions),
                    })) });
            });
            const address = 'foobar';
            const res = yield (0, supertest_1.default)(app_1.default)
                .get(`/v1/transactions/by/${address}`)
                .set('Authorization', `Bearer ${fixtures_1.authToken}`);
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text)).toEqual(transactions);
        }));
        it('should return a 404 status code when there are no transactions', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(typeorm_config_1.myDataSource, 'getRepository').mockImplementation(() => {
                const original = jest.requireActual('typeorm');
                return Object.assign(Object.assign({}, original), { createQueryBuilder: jest.fn().mockImplementation(() => ({
                        subQuery: jest.fn().mockReturnThis(),
                        from: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        select: jest.fn().mockReturnThis(),
                        getQuery: jest.fn().mockReturnThis(),
                        setParameter: jest.fn().mockReturnThis(),
                        getMany: jest.fn().mockResolvedValue([]),
                    })) });
            });
            const address = 'foobar';
            const res = yield (0, supertest_1.default)(app_1.default)
                .get(`/v1/transactions/by/${address}`)
                .set('Authorization', `Bearer ${fixtures_1.authToken}`);
            expect(res.status).toEqual(404);
            expect(res.text).toEqual('Not found.');
        }));
    });
});
//# sourceMappingURL=transaction.test.js.map