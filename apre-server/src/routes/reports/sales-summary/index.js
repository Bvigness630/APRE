
/**
 * Author: Boyd Vigness
 * Description: API for retrieving the sales summary report.
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');

const router = express.Router();

/**
 * @description
 * GET /summary
 * Retrieves total sales grouped by salesperson and region.
 */
router.get('/summary', (req, res, next) => {
  mongo(async (db) => {
    const salesSummary = await db.collection('sales').aggregate([
      {
        $group: {
          _id: {
            salesperson: '$salesperson',
            region: '$region'
          },
          totalSales: { $sum: '$amount' }
        }
      },
      {
        $project: {
          _id: 0,
          salesperson: '$_id.salesperson',
          region: '$_id.region',
          totalSales: 1
        }
      },
      {
        $sort: {
          salesperson: 1,
          region: 1
        }
      }
    ]).toArray();

    res.send(salesSummary);
  }, next);
});

module.exports = router;
