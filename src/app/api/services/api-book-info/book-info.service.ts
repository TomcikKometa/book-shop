import { Injectable, inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BookInfoComponent } from '../../../features/components/book-info/book-info.component';

@Injectable({
  providedIn: 'root'
})
export class BookInfoService {

  private readonly matDialog: MatDialog = inject(MatDialog);

  public openMatDialog(): void {
    this.matDialog.open(BookInfoComponent, {});
  }
}
