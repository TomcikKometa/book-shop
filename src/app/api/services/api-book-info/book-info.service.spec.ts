import { TestBed } from '@angular/core/testing';
import { BookInfoService } from './book-info.service';

describe('ApiBookInfoService', () => {
  let service: BookInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
