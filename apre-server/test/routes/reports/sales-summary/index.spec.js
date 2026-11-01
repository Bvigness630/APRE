
/**
 * Author: Boyd Vigness
 * Description: Tests for the sales summary API.
 */

const request = require('supertest');
const app = require('../../../../src/app');
const { mongo } = require('../../../../src/utils/mongo');

jest.mock('../../../../src/utils/mongo');

describe('Sales Summary API', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test that the API returns grouped sales summary records.
  it('should return sales grouped by salesperson and region', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              salesperson: 'John Doe',
              region: 'North',
              totalSales: 1500
            },
            {
              salesperson: 'Jane Smith',
              region: 'South',
              totalSales: 2000
            }
          ])
        })
      };

      await callback(db);
    });

    const response = await request(app).get('/api/reports/sales/summary');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        salesperson: 'John Doe',
        region: 'North',
        totalSales: 1500
      },
      {
        salesperson: 'Jane Smith',
        region: 'South',
        totalSales: 2000
      }
    ]);
  });

  // Test that the API returns an empty array when no sales exist.
  it('should return an empty array when no sales records are found', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([])
        })
      };

      await callback(db);
    });

    const response = await request(app).get('/api/reports/sales/summary');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Test that an invalid endpoint returns a 404 response.
  it('should return 404 for an invalid endpoint', async () => {
    const response = await request(app).get('/api/reports/sales-summary/invalid');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });
});
