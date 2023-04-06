import request from 'supertest';
import app from '../src/app';
import { myDataSource } from '../src/database/typeorm.config';
import { authToken } from './fixtures';

describe('getBalance', () => {
  describe('getBalanceByAddress', () => {
    it('should return balance by address', async () => {
      const mocked = {
        to: 'foobar',
        from: 'barfoo',
        balanceAddressFrom: '20',
        balanceAddressTo: '50'
      }
      const result = { address: 'foobar', balance: '50' };

      jest.spyOn(myDataSource, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          createQueryBuilder: jest.fn().mockImplementation(() => ({
            subQuery: jest.fn().mockReturnThis() as unknown,
            from: jest.fn().mockReturnThis() as unknown,
            select: jest.fn().mockReturnThis() as unknown,
            where: jest.fn().mockReturnThis() as unknown,
            getQuery: jest.fn().mockReturnThis() as unknown,
            setParameter: jest.fn().mockReturnThis() as unknown,
            getOne: jest.fn().mockResolvedValue(mocked) as unknown,
          })),
        };
      });

      const address = 'foobar';
      const res = await request(app)
      .get(`/v1/balances/${address}`)
      .set('Authorization', `Bearer ${authToken}`)

      expect(res.status).toEqual(200);
      expect(JSON.parse(res.text)).toEqual(result);
    });

    it('should return a 404 status code when there are no transactions', async () => {
      const mockedData = { to: 'foobar', balanceAddressTo: null, from: 'barfoo', balanceAddressFrom: '20' };
      jest.spyOn(myDataSource, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          createQueryBuilder: jest.fn().mockImplementation(() => ({
            subQuery: jest.fn().mockReturnThis() as unknown,
            from: jest.fn().mockReturnThis() as unknown,
            select: jest.fn().mockReturnThis() as unknown,
            where: jest.fn().mockReturnThis() as unknown,
            getQuery: jest.fn().mockReturnThis() as unknown,
            setParameter: jest.fn().mockReturnThis() as unknown,
            getOne: jest.fn().mockResolvedValue(mockedData) as unknown,
          })),
        };
      });

      const address = 'foobar';
      const res = await request(app)
        .get(`/v1/balances/${address}`)
        .set('Authorization', `Bearer ${authToken}`)

      expect(res.status).toEqual(404);
      expect(res.text).toEqual('Not found.');
    });
  });
});
