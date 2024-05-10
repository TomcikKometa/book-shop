import { Component } from '@angular/core';
import { DashboardCardsComponent } from '../../components/dashboard-cards/dashboard-cards.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [DashboardCardsComponent,NavBarComponent],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent {

}
