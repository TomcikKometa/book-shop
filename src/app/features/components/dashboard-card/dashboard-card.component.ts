import {
  Component,
  OnChanges,
  OnInit,
  DestroyRef,
  inject,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, tap } from 'rxjs';
import { ApiBookModel } from '../../../api/services/models/api-response-model';
import { MainDashboardService } from '../../../api/services/main-dashboard.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss',
})
export class DashboardCardComponent{
  public bookPerPage$: Observable<ApiBookModel[]> = inject(MainDashboardService).booksPerPage;
  public isSpinner: Observable<boolean> = inject(MainDashboardService).isSpinner;
  public isData: Observable<boolean> = inject(MainDashboardService).isData;
}
