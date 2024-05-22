import { TestBed } from '@angular/core/testing';

import { ApiTodoService } from './api-todo.service';
import { first } from 'rxjs';
import { TodosResponse } from '../api-books/api-books.service';

fdescribe('ApiTodoService', () => {
  let service: ApiTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
