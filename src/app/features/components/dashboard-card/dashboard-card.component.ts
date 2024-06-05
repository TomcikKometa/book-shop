import { Component, OnChanges, OnInit, DestroyRef, inject, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Observable, tap } from 'rxjs';
import { ApiBookModel } from '../../../api/services/models/api-response-model';
import { MainDashboardService } from '../../../api/services/main-dashboard.service';
import { CommonModule } from '@angular/common';
import { BookInfoService } from '../../../api/services/api-book-info/book-info.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookInfoComponent } from '../book-info/book-info.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import lottie from 'lottie-web';
@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatDialogModule, LottieComponent],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent {
  options: AnimationOptions = {
    path: '/assets/animations/loading.json',
    loop: true,
    autoplay: true
  };
  protected isRendered: boolean = true;
  public bookPerPage$: Observable<ApiBookModel[]> = inject(MainDashboardService).booksPerPage;
  public isSpinner: Observable<boolean> = inject(MainDashboardService).isSpinner;
  public isData: Observable<boolean> = inject(MainDashboardService).isData;
  public changeDetectionRef:ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('#lottieComponent') lottiComponent? : LottieComponent;

  protected readonly bookInfoService: BookInfoService = inject(BookInfoService);

  complited() {
    this.isRendered = false;
    this.changeDetectionRef.detectChanges();
    console.log(this.isRendered);
  }
}
