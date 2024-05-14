import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [NavBarComponent,DashboardCardComponent,PaginatorComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent {
}
