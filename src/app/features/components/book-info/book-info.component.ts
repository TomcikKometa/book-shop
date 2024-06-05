import { Component, OnInit, inject } from '@angular/core';
import { Observable, first } from 'rxjs';
import { BookInfoService } from '../../../api/services/api-book-info/book-info.service';
import { ApiSingleBookInfo } from '../../../api/services/models/api-response-single-book-model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiSingleBookInfoDto } from '../../../api/services/models/api-response-single-bookDto-model';

@Component({
  selector: 'app-book-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CommonModule,MatDialogModule],
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent implements OnInit {
  backgroundImage:string= ''

  public bookInfo$: Observable<ApiSingleBookInfoDto> = inject(BookInfoService).apiResponseSingleInfo;

  ngOnInit(): void {
    this.bookInfo$.pipe(first()).subscribe((value:ApiSingleBookInfoDto)=> {this.backgroundImage = value.cover})
    
  }


}
