"use strict";
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
const fixtures_1 = require("./fixtures");
describe('getBalance', () => {
    describe('getBalanceByAddress', () => {
        it('should return balance by address', () => __awaiter(void 0, void 0, void 0, function* () {
            const mocked = {
                to: 'foobar',
                from: 'barfoo',
                balanceAddressFrom: '20',
                balanceAddressTo: '50'
            };
            const result = { address: 'foobar', balance: '50' };
            jest.spyOn(typeorm_config_1.myDataSource, 'getRepository').mockImplementation(() => {
                const original = jest.requireActual('typeorm');
                return Object.assign(Object.assign({}, original), { createQueryBuilder: jest.fn().mockImplementation(() => ({
                        subQuery: jest.fn().mockReturnThis(),
                        from: jest.fn().mockReturnThis(),
                        select: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        getQuery: jest.fn().mockReturnThis(),
                        setParameter: jest.fn().mockReturnThis(),
                        getOne: jest.fn().mockResolvedValue(mocked),
                    })) });
            });
            const address = 'foobar';
            const res = yield (0, supertest_1.default)(app_1.default)
                .get(`/v1/balances/${address}`)
                .set('Authorization', `Bearer ${fixtures_1.authToken}`);
            expect(res.status).toEqual(200);
            expect(JSON.parse(res.text)).toEqual(result);
        }));
        it('should return a 404 status code when there are no transactions', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockedData = { to: 'foobar', balanceAddressTo: null, from: 'barfoo', balanceAddressFrom: '20' };
            jest.spyOn(typeorm_config_1.myDataSource, 'getRepository').mockImplementation(() => {
                const original = jest.requireActual('typeorm');
                return Object.assign(Object.assign({}, original), { createQueryBuilder: jest.fn().mockImplementation(() => ({
                        subQuery: jest.fn().mockReturnThis(),
                        from: jest.fn().mockReturnThis(),
                        select: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        getQuery: jest.fn().mockReturnThis(),
                        setParameter: jest.fn().mockReturnThis(),
                        getOne: jest.fn().mockResolvedValue(mockedData),
                    })) });
            });
            const address = 'foobar';
            const res = yield (0, supertest_1.default)(app_1.default)
                .get(`/v1/balances/${address}`)
                .set('Authorization', `Bearer ${fixtures_1.authToken}`);
            expect(res.status).toEqual(404);
            expect(res.text).toEqual('Not found.');
        }));
    });
});
//# sourceMappingURL=balance.test.js.map