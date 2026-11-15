import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerFeedbackReportComponent } from './customer-feedback-report.component';
import { environment } from '../../../../environments/environment';

describe('CustomerFeedbackReportComponent', () => {
  let component: CustomerFeedbackReportComponent;
  let fixture: ComponentFixture<CustomerFeedbackReportComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CustomerFeedbackReportComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFeedbackReportComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    const request = httpMock.expectOne(
      `${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-report`
    );
    request.flush([]);

    expect(component).toBeTruthy();
  });

  it('should display the Customer Feedback Report title', () => {
    const request = httpMock.expectOne(
      `${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-report`
    );
    request.flush([]);

    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Customer Feedback Report');
  });

  it('should map feedback data into table columns', () => {
    const request = httpMock.expectOne(
      `${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-report`
    );

    request.flush([
      {
        date: '2026-01-15',
        channel: 'Email',
        rating: 4
      }
    ]);

    fixture.detectChanges();

    expect(component.customerFeedbackData).toEqual([
      {
        'Date': '2026-01-15',
        'Channel': 'Email',
        'Rating': 4
      }
    ]);
  });
});