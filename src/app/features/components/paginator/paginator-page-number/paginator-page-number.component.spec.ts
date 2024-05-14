import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorPageNumberComponent } from './paginator-page-number.component';

describe('PaginatorPageNumberComponent', () => {
  let component: PaginatorPageNumberComponent;
  let fixture: ComponentFixture<PaginatorPageNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorPageNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorPageNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
