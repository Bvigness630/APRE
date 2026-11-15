import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TableComponent } from '../../../shared/table/table.component';

@Component({
  selector: 'app-customer-feedback-report',
  standalone: true,
  imports: [TableComponent],
  template: `
    <h1>Customer Feedback Report</h1>

    @if (customerFeedbackData.length > 0) {
      <div class="card">
        <app-table
          [title]="'Customer Feedback'"
          [data]="customerFeedbackData"
          [headers]="['Date', 'Channel', 'Rating']"
          [sortableColumns]="['Date', 'Channel', 'Rating']"
          [headerBackground]="'secondary'">
        </app-table>
      </div>
    } @else {
      <p>No customer feedback data available.</p>
    }
  `
})
export class CustomerFeedbackReportComponent {
  customerFeedbackData: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any[]>(
      `${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-report`
    ).subscribe({
      next: (data) => {
        this.customerFeedbackData = data.map((feedback) => ({
          'Date': feedback.date,
          'Channel': feedback.channel,
          'Rating': feedback.rating
        }));
      },
      error: (err) => {
        console.error('Error fetching customer feedback:', err);
      }
    });
  }
}