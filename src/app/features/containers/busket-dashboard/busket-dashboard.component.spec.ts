import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusketDashboardComponent } from './busket-dashboard.component';

describe('BusketDashboardComponent', () => {
  let component: BusketDashboardComponent;
  let fixture: ComponentFixture<BusketDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusketDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusketDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
