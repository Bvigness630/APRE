# APRE - Average Performance by Agent Report

## Overview

This project adds an Average Performance by Agent report to the APRE application. It retrieves agent performance data from the database, calculates the average performance for each agent, and displays the results in a table.

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

## API Endpoint

`GET /api/reports/agent-performance/average-performance-by-agent`

Returns agent IDs, agent names, and average performance values.

## Testing

Run `npm test -- --runInBand` from the `apre-server` folder to execute the server test suite.

Run `npm test -- --watch=false` from the `apre-client` folder to execute the Angular test suite.

Run `npm run build` from `apre-client` to build the Angular application.