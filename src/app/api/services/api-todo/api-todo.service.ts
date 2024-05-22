import { Injectable, inject } from '@angular/core';
import { TodosResponse } from '../api-books/api-books.service';
import { Observable, first, map, of } from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiTodoService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  public getTodoApi(): Observable<TodosResponse | null> {
    return this.httpClient.get<TodosResponse[]>('https://gorest.co.in/public/v2/todos ').pipe(
      first(),
      map((response: TodosResponse[]) =>  {
        const secondElement:TodosResponse[] = response.filter((value: TodosResponse,index) => (value.status === 'pending' && index == 1));
        return secondElement[0]
      }
    ));
  }
}
