# APRE - Average Performance by Agent and Customer Feedback Reports

## Overview

This project adds reporting functionality to the APRE application. The Average Performance by Agent report retrieves agent performance data from the database, calculates the average performance for each agent, and displays the results in a table.

The Customer Feedback Report retrieves customer feedback records, including the date, channel, and rating, and displays the results in a table.

## Running the Application

1. Open a terminal in `apre-server` and run:

   ```bash
   npm install
   npm start
   ```

2. Open another terminal in `apre-client` and run:

   ```bash
   npm install
   npx ng serve
   ```

3. Open `http://localhost:4200/` in your browser.

## API Endpoints

### Average Performance by Agent

`GET /api/reports/agent-performance/average-performance-by-agent`

Returns agent IDs, agent names, and average performance values.

### Customer Feedback Report

`GET /api/reports/customer-feedback/customer-feedback-report`

Returns customer feedback records containing the date, channel, and rating. The records are sorted by date in descending order.

## Testing

Run `npm test -- --runInBand` from the `apre-server` folder to execute the server test suite.

Run `npm test -- --watch=false` from the `apre-client` folder to execute the Angular test suite.

Run `npm run build` from the `apre-client` folder to build the Angular application.

Both report implementations include automated tests for their API and client functionality.