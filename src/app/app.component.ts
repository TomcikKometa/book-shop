import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainDashboardComponent } from './features/containers/main-dashboard/main-dashboard.component';
import { NavBarComponent } from './features/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MainDashboardComponent,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bookShop';
}
