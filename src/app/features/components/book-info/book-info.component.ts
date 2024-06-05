import { ChangeDetectorRef, Component, DestroyRef, OnInit, afterRender, inject } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, first } from 'rxjs';
import { BookInfoService } from '../../../api/services/api-book-info/book-info.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiSingleBookInfoDto } from '../../../api/services/models/api-response-single-bookDto-model';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import lottie from 'lottie-web';
import {MatFormField, MatSelectModule} from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SearchType } from '../../../api/services/main-dashboard.service';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatDialogModule, LottieComponent,MatDialogModule,MatSelectModule,MatFormField,FormsModule,ReactiveFormsModule],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent implements OnInit {
  backgroundImage: string = '';
  options: AnimationOptions = {
    path: '/assets/animations/loading.json',
    loop: true,
    autoplay: true
  };
  protected searchControlTitle: FormControl = new FormControl<string>('Wybierz MP3');
  protected isRendered: boolean = false;
  private isImageLoading: boolean = true;

  public bookInfo$: Observable<ApiSingleBookInfoDto> = inject(BookInfoService).apiResponseSingleInfo;
  public dialogRef: MatDialogRef<BookInfoComponent> = inject(MatDialogRef);
  public changeDetectionRef:ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly distroyReference: DestroyRef = inject(DestroyRef);
selectedCompetence: any;

  ngOnInit(): void {
    this.bookInfo$.pipe(first()).subscribe((value: ApiSingleBookInfoDto) => {
      this.backgroundImage = value.cover;
      console.log(value);
      
    });

    this.searchControlTitle.valueChanges
      .pipe(takeUntilDestroyed(this.distroyReference),debounceTime(500),distinctUntilChanged())
      .subscribe((value: string) =>
        {console.log(value),
      value === 'Wybierz MP3'? '': window.location.href = value}
      );
  }
  protected load(event: any) {
    this.isImageLoading = false;
  }

  complited(event: any) {
    if (this.isImageLoading === false) {
      this.isRendered = true;
      this.changeDetectionRef.detectChanges();
    }
  }

  selected(x:any){
    console.log(x);
    
  }
}
