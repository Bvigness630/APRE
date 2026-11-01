
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TableComponent } from '../../../shared/table/table.component';

@Component({
  selector: 'app-sales-summary',
  standalone: true,
  imports: [TableComponent],
  template: `
    <h1>Sales Summary Report</h1>

    @if (salesData.length > 0) {
      <div class="card">
        <app-table
          [title]="'Sales Summary'"
          [data]="salesData"
          [headers]="['Sales Person', 'Region', 'Total Sales']"
          [sortableColumns]="['Sales Person', 'Region', 'Total Sales']"
          [headerBackground]="'secondary'">
        </app-table>
      </div>
    } @else {
      <p>No sales data available.</p>
    }
  `
})
export class SalesSummaryComponent {
  salesData: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any[]>(`${environment.apiBaseUrl}/reports/sales/summary`)
      .subscribe({
        next: (data) => {
          this.salesData = data.map((sale) => ({
            'Sales Person': sale.salesperson,
            'Region': sale.region,
            'Total Sales': sale.totalSales
          }));
        },
        error: (err) => {
          console.error('Error fetching sales summary:', err);
        }
      });
  }
}
