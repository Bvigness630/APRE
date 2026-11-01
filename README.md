\# APRE - Sales Summary Report



\## Overview



This project adds a Sales Summary report to the APRE application. It retrieves sales data from the database, groups it by salesperson and region, and displays the totals in a table.



\## Running the Application



1\. Open a terminal in `apre-server` and run:



&#x20;  ```bash

&#x20;  npm install

&#x20;  npm start

&#x20;  ```



2\. Open another terminal in `apre-client` and run:



&#x20;  ```bash

&#x20;  npm install

&#x20;  npx ng serve

&#x20;  ```



3\. Open `http://localhost:4200/` in your browser.



\## API Endpoint



`GET /api/reports/sales/summary`



Returns sales totals grouped by salesperson and region.



\## Testing



Run `npm test` from both the `apre-server` and `apre-client` folders to execute their respective test suites.



Run `npm run build` from `apre-client` to build the Angular application.

