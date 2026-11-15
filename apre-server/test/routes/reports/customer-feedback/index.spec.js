/**
 * Author: Professor Krasso
 * Date: 10 September 2024
 * File: index.spec.js
 * Description: Test the customer feedback API
 */

// Require the modules
const request = require('supertest');
const app = require('../../../../src/app');
const { mongo } = require('../../../../src/utils/mongo');

jest.mock('../../../../src/utils/mongo');

// Test the customer feedback API
describe('Apre Customer Feedback API', () => {
  beforeEach(() => {
    mongo.mockClear();
  });

  // Test the channel-rating-by-month endpoint
  it('should fetch average customer feedback ratings by channel for a specified month', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              channels: ['Email', 'Phone'],
              ratingAvg: [4.5, 3.8]
            }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get('/api/reports/customer-feedback/channel-rating-by-month?month=1');

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        channels: ['Email', 'Phone'],
        ratingAvg: [4.5, 3.8]
      }
    ]);
  });

  // Test the channel-rating-by-month endpoint with missing parameters
  it('should return 400 if the month parameter is missing', async () => {
    const response = await request(app).get('/api/reports/customer-feedback/channel-rating-by-month');
    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'month and channel are required',
      status: 400,
      type: 'error'
    });
  });

  // Test the channel-rating-by-month endpoint with an invalid month
  it('should return 404 for an invalid endpoint', async () => {
    const response = await request(app).get('/api/reports/customer-feedback/invalid-endpoint');
    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });

  // Test the customer-feedback-report endpoint
  it('should fetch customer feedback records', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            {
              date: '2026-01-15',
              channel: 'Email',
              rating: 4
            },
            {
              date: '2026-01-14',
              channel: 'Phone',
              rating: 5
            }
          ])
        })
      };
      await callback(db);
    });

    const response = await request(app).get(
      '/api/reports/customer-feedback/customer-feedback-report'
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        date: '2026-01-15',
        channel: 'Email',
        rating: 4
      },
      {
        date: '2026-01-14',
        channel: 'Phone',
        rating: 5
      }
    ]);
  });

  // Test the customer-feedback-report endpoint with no records
  it('should return an empty array when no customer feedback records exist', async () => {
    mongo.mockImplementation(async (callback) => {
      const db = {
        collection: jest.fn().mockReturnThis(),
        aggregate: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([])
        })
      };
      await callback(db);
    });

    const response = await request(app).get(
      '/api/reports/customer-feedback/customer-feedback-report'
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  // Test the customer-feedback-report endpoint with an invalid report
  it('should return 404 for an invalid customer feedback report endpoint', async () => {
    const response = await request(app).get(
      '/api/reports/customer-feedback/invalid-report'
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Not Found',
      status: 404,
      type: 'error'
    });
  });
});