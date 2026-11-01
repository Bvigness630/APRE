
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SalesSummaryComponent } from './sales-summary.component';
import { environment } from '../../../../environments/environment';

describe('SalesSummaryComponent', () => {
  let component: SalesSummaryComponent;
  let fixture: ComponentFixture<SalesSummaryComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SalesSummaryComponent]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SalesSummaryComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    const request = httpMock.expectOne(
      `${environment.apiBaseUrl}/reports/sales/summary`
    );
    request.flush([]);

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should fetch and display sales summary data', () => {
    const salesRecords = [
      { salesperson: 'John Doe', region: 'North', totalSales: 1500 },
      { salesperson: 'Jane Smith', region: 'South', totalSales: 2000 }
    ];

    const request = httpMock.expectOne(
      `${environment.apiBaseUrl}/reports/sales/summary`
    );
    request.flush(salesRecords);

    fixture.detectChanges();

    expect(component.salesData.length).toBe(2);
    expect(component.salesData[0]['Sales Person']).toBe('John Doe');
    expect(component.salesData[0]['Region']).toBe('North');
    expect(component.salesData[0]['Total Sales']).toBe(1500);
  });

  it('should display a message when no sales data is available', () => {
    const request = httpMock.expectOne(
      `${environment.apiBaseUrl}/reports/sales/summary`
    );
    request.flush([]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('No sales data available.');
  });
});
