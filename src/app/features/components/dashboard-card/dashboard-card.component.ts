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
import { BookInfoService } from '../../../api/services/api-book-info/book-info.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookInfoComponent } from '../book-info/book-info.component';
@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,MatDialogModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss',
})
export class DashboardCardComponent{
  public bookPerPage$: Observable<ApiBookModel[]> = inject(MainDashboardService).booksPerPage;
  public isSpinner: Observable<boolean> = inject(MainDashboardService).isSpinner;
  public isData: Observable<boolean> = inject(MainDashboardService).isData;

  protected readonly bookInfoService: BookInfoService = inject(BookInfoService);

 
}
