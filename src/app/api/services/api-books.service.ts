import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiBooksService {

private readonly httpClient:HttpClient = inject(HttpClient);

public getAllBooks(){
this.httpClient.get<any>()
}

}
