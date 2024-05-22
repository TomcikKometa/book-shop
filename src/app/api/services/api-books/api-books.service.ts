import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiBookModel } from '../models/api-response-model';
import { ApiBooksUrls } from '../../api-books-urls';
import { Observable, Subject, first, of } from 'rxjs';

export interface TodosResponse {
  id: number;
  user_id: number;
  title: string;
  due_on: string;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class ApiBooksService {
  private filterSearch$: Subject<ApiBookModel[]> = new Subject<ApiBookModel[]>();
  public filterSearch: Observable<ApiBookModel[]> = this.filterSearch$.asObservable();

  private readonly httpClient: HttpClient = inject(HttpClient);

  public getAllBooks(): Observable<ApiBookModel[]> {
    if (localStorage.getItem('filterSearch')) {
      const JSONpars: string = localStorage.getItem('filterSearch')!;
      return of(JSON.parse(JSONpars) as ApiBookModel[]);
    } else {
      localStorage.clear();
      return this.httpClient.get<ApiBookModel[]>(ApiBooksUrls.prepareGetAllBooks()).pipe(first());
    }
  }
  public getAllBooksForFilter(): Observable<ApiBookModel[]> {
    return this.httpClient.get<ApiBookModel[]>(ApiBooksUrls.prepareGetAllBooks()).pipe(first());
  }
}
