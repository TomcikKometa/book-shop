import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { BookInfoService } from '../../../api/services/api-book-info/book-info.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiSingleBookInfoDto } from '../../../api/services/models/api-response-single-bookDto-model';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';

export enum ControlAudioString {
  CHOOSE_MP3 = 'Wybierz MP3'
}
@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    LottieComponent,
    MatDialogModule,
    MatSelectModule,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent implements OnInit {
  protected options: AnimationOptions = {
    path: '/assets/animations/loading.json',
    loop: true,
    autoplay: true
  };
  protected controlAudio: FormControl = new FormControl<string>(ControlAudioString.CHOOSE_MP3);
  protected isRendered: boolean = false;
  protected isImageLoading: boolean = true;

  protected readonly bookInfo$: Observable<ApiSingleBookInfoDto> = inject(BookInfoService).apiResponseSingleInfo;
  private readonly dialogRef: MatDialogRef<BookInfoComponent> = inject(MatDialogRef);
  private readonly changeDetectionRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly distroyReference: DestroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.controlAudio.valueChanges
      .pipe(takeUntilDestroyed(this.distroyReference), debounceTime(500), distinctUntilChanged())
      .subscribe((value: string) => {
          value === ControlAudioString.CHOOSE_MP3 ? '' : (window.location.href = value)
      });
  }
  protected load() {
    this.isImageLoading = false;
  }

  protected complited() {
    if (this.isImageLoading === false) {
      this.isRendered = true;
      this.changeDetectionRef.detectChanges();
    }
  }

  protected closeMatDialog(){
    this.dialogRef.close();
  }

  protected get controlAudioString():string {
    return ControlAudioString.CHOOSE_MP3
  }
}
