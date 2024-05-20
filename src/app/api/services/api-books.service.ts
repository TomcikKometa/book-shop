import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiBookModel } from './models/api-response-model';
import { ApiBooksUrls } from '../api-books-urls';
import { Observable, first, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiBooksService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  public getAllBooks(): Observable<ApiBookModel[]> {
    // return of(ALL_BOOKS);

       return this.httpClient
          .get<ApiBookModel[]>(ApiBooksUrls.prepareGetAllBooks())
          .pipe(first())
  }
}
