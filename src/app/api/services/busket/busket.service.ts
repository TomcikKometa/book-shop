import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusketService {

  private readonly router: Router = inject(Router);

  
}
