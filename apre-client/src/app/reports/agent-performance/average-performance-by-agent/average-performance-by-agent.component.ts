import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TableComponent } from '../../../shared/table/table.component';

@Component({
  selector: 'app-average-performance-by-agent',
  standalone: true,
  imports: [TableComponent],
  template: `
    <h1>Average Performance by Agent Report</h1>

    @if (agentPerformanceData.length > 0) {
      <div class="card">
        <app-table
          [title]="'Average Performance by Agent'"
          [data]="agentPerformanceData"
          [headers]="['Agent ID', 'Agent Name', 'Average Performance']"
          [sortableColumns]="['Agent ID', 'Agent Name', 'Average Performance']"
          [headerBackground]="'secondary'">
        </app-table>
      </div>
    } @else {
      <p>No agent performance data available.</p>
    }
  `
})
export class AveragePerformanceByAgentComponent {
  agentPerformanceData: any[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any[]>(
      `${environment.apiBaseUrl}/reports/agent-performance/average-performance-by-agent`
    ).subscribe({
      next: (data) => {
        this.agentPerformanceData = data.map((agent) => ({
          'Agent ID': agent.agentId,
          'Agent Name': agent.name,
          'Average Performance': agent.averagePerformance
        }));
      },
      error: (err) => {
        console.error('Error fetching agent performance:', err);
      }
    });
  }
}