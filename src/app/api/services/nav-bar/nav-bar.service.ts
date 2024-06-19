import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MainDashboardService } from '../main-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  public isFiltred: boolean = false;
  
  private readonly router: Router = inject(Router);
  private readonly mainDashboardService: MainDashboardService = inject(MainDashboardService);

  public changeViewedNavBar(): void {
    this.isFiltred = !this.isFiltred;
  }
  public navigateToBusket() {
    this.router.navigate(['busket-dashboard']);
  }

  public navigateToMainDashborad() {
    this.router.navigate(['main-dashboard']);
    this.mainDashboardService.getBooks();
    this.mainDashboardService.startPartBooksItems = 0;
    this.mainDashboardService.endPartBooksItems = 25;
  }
 
}
