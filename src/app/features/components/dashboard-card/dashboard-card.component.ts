import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, tap } from 'rxjs';
import { ApiBookModel } from '../../../api/services/models/api-response-model';
import { MainDashboardService } from '../../../api/services/main-dashboard.service';
import { CommonModule } from '@angular/common';
import { BookInfoService } from '../../../api/services/api-book-info/book-info.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatDialogModule, LottieComponent,MatIconModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent {
  protected options: AnimationOptions = {
    path: '/assets/animations/loading.json',
    loop: true,
    autoplay: true
  };
  protected isRendered: boolean = true;
  @ViewChild('#lottieComponent') lottiComponent? : LottieComponent;

  protected readonly bookPerPage$: Observable<ApiBookModel[]> = inject(MainDashboardService).booksPerPage;
  protected readonly isSpinner: Observable<boolean> = inject(MainDashboardService).isSpinner;
  protected readonly isData: Observable<boolean> = inject(MainDashboardService).isData;
  protected readonly bookInfoService: BookInfoService = inject(BookInfoService);
}
