import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AveragePerformanceByAgentComponent } from './average-performance-by-agent.component';
import { environment } from '../../../../environments/environment';

describe('AveragePerformanceByAgentComponent', () => {
  let component: AveragePerformanceByAgentComponent;
  let fixture: ComponentFixture<AveragePerformanceByAgentComponent>;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiBaseUrl}/reports/agent-performance/average-performance-by-agent`;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AveragePerformanceByAgentComponent]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AveragePerformanceByAgentComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    const request = httpMock.expectOne(apiUrl);
    request.flush([]);

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should fetch and map agent performance data', () => {
    const agentRecords = [
      { agentId: 101, name: 'Agent A', averagePerformance: 85 },
      { agentId: 102, name: 'Agent B', averagePerformance: 92 }
    ];

    const request = httpMock.expectOne(apiUrl);
    request.flush(agentRecords);

    fixture.detectChanges();

    expect(component.agentPerformanceData.length).toBe(2);
    expect(component.agentPerformanceData[0]['Agent ID']).toBe(101);
    expect(component.agentPerformanceData[0]['Agent Name']).toBe('Agent A');
    expect(component.agentPerformanceData[0]['Average Performance']).toBe(85);
  });

  it('should display a message when no agent performance data is available', () => {
    const request = httpMock.expectOne(apiUrl);
    request.flush([]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('No agent performance data available.');
  });
});