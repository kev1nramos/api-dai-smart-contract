import request from 'supertest';
import app from '../src/app';
import { myDataSource } from '../src/database/typeorm.config';
import fixtures, { authToken } from './fixtures';

describe('transactionsAPI', () => {
  const transactions = [
    fixtures.loadTransaction(),
    fixtures.loadTransaction(),
    fixtures.loadTransaction(),
    fixtures.loadTransaction(),
    fixtures.loadTransaction(),
  ];

  describe('getTransactions', () => {

    const result = {
      transactions,
      page: 1,
      limit: 10,
    };

    it('should return transactions with page and limit', async () => {
      const mockGetTransactions = jest.fn((): any => [transactions]);
  
      jest
        .spyOn(myDataSource, 'transaction')
        .mockImplementation(() => mockGetTransactions());
  
      const page = 1,
        limit = 10;
      const res = await request(app)
      .get(
        `/v1/transactions/list/${page}/${limit}`,
      )
      .set('Authorization', `Bearer ${authToken}`)
  
      expect(mockGetTransactions).toHaveBeenCalledTimes(1);
      expect(res.status).toEqual(200);
      expect(JSON.parse(res.text)).toEqual(result);
    });
  
    it('should return a 404 status code when there are no transactions', async () => {
      const mockGetTransactions = jest.fn((): any => []);
  
      jest
        .spyOn(myDataSource, 'transaction')
        .mockImplementation(() => mockGetTransactions());
  
      const page = 1,
        limit = 10;
      const res = await request(app)
      .get(
        `/v1/transactions/list/${page}/${limit}`,
      )
      .set('Authorization', `Bearer ${authToken}`)
  
      expect(mockGetTransactions).toHaveBeenCalledTimes(1);
      expect(res.status).toEqual(404);
      expect(res.text).toEqual('Not found.');
    });
  })


  describe('getTransactionsByAddress', () => {
    it('should return transactions by address', async () => {
      jest.spyOn(myDataSource, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          createQueryBuilder: jest.fn().mockImplementation(() => ({
            subQuery: jest.fn().mockReturnThis() as unknown,
            from: jest.fn().mockReturnThis() as unknown,
            where: jest.fn().mockReturnThis() as unknown,
            select: jest.fn().mockReturnThis() as unknown,
            getQuery: jest.fn().mockReturnThis() as unknown,
            setParameter: jest.fn().mockReturnThis() as unknown,
            getMany: jest.fn().mockResolvedValue(transactions) as unknown,
          })),
        };
      });

      const address = 'foobar';
      const res = await request(app)
      .get(`/v1/transactions/by/${address}`)
      .set('Authorization', `Bearer ${authToken}`)

      expect(res.status).toEqual(200);
      expect(JSON.parse(res.text)).toEqual(transactions);
    });

    it('should return a 404 status code when there are no transactions', async () => {
      jest.spyOn(myDataSource, 'getRepository').mockImplementation(() => {
        const original = jest.requireActual('typeorm');
        return {
          ...original,
          createQueryBuilder: jest.fn().mockImplementation(() => ({
            subQuery: jest.fn().mockReturnThis() as unknown,
            from: jest.fn().mockReturnThis() as unknown,
            where: jest.fn().mockReturnThis() as unknown,
            select: jest.fn().mockReturnThis() as unknown,
            getQuery: jest.fn().mockReturnThis() as unknown,
            setParameter: jest.fn().mockReturnThis() as unknown,
            getMany: jest.fn().mockResolvedValue([]) as unknown,
          })),
        };
      });

      const address = 'foobar';
      const res = await request(app)
      .get(`/v1/transactions/by/${address}`)
      .set('Authorization', `Bearer ${authToken}`)

      expect(res.status).toEqual(404);
      expect(res.text).toEqual('Not found.');
    });
  });
});
