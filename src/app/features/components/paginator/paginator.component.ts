import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { PaginatorPageNumberComponent } from './paginator-page-number/paginator-page-number.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { MainDashboardService } from '../../../api/services/main-dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface PaginationOptions {
  currentPage?: number;
  numberOfItems?: number;
}

interface PaginatorSelectOptions {
  label: string;
  value: number;
}

@Component({
  selector: 'planet-paginator',
  standalone: true,
  imports: [
    PaginatorPageNumberComponent,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  public selectedNumberOfItems: number = 10;
  public pages: any[] = [];
  increasedPage = 10;
  decreasedPage = 1;
  start = 0;
  protected pagesToHandle: number = 0;
  public numberOfPages$: Observable<number> =
    inject(MainDashboardService).numberOfPages;
  public numberOfPages: number = 0;
  @Input() public currentPage: number = 1;
  public changedPage$: Subject<number> = new Subject<number>();

  public readonly paginatorSelectOptions: PaginatorSelectOptions[] = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
  ];

  public paginationObject = {
    previousValue: 0,
    currentValue: 1
  };

  private readonly distroyReference: DestroyRef = inject(DestroyRef);
  private readonly mainDashboardService: MainDashboardService =
    inject(MainDashboardService);

  public ngOnInit(): void {
    this.numberOfPages$
      .pipe(takeUntilDestroyed(this.distroyReference))
      .subscribe((value: number) => {
        this.pagesToHandle = value;
        this.pages = Array(10)
      .fill(10)
      .map((x: unknown, i: number) => i + 1);
        this.preparePagesToLoad();
      });
  }

  public changePage(page: number): void {
    this.paginationObject.previousValue = this.currentPage
    this.paginationObject.currentValue = page;
    this.currentPage = page;
    this.handlePaginationChange();

  }

  public moveBackwardPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.handlePaginationChange();
    }
  }

  public moveForwardPage(): void {
    if (this.numberOfPages > this.currentPage) {
      this.currentPage = this.currentPage + 1;
      this.handlePaginationChange();
    }
  }

  public handlePaginationChange(): void {
    this.mainDashboardService.changedPage(this.currentPage);
  }

  preparePagesToLoad() {

      if(this.paginationObject.previousValue < this.paginationObject.currentValue){
        let start = this.increasedPage++;
        let removeInxdex = this.increasedPage - 11;
        this.pages = Array(start).fill(0).map((x: unknown, i: number) => i + 1);
        this.pages.splice(0,removeInxdex);
      }

      if(this.paginationObject.previousValue > this.paginationObject.currentValue){
        let start = this.increasedPage--;
        this.pages = Array(this.increasedPage).fill({},2).map((x: unknown, i: number) => i - 1);
        if(this.pages.length >= 12 && this.pages.indexOf(0) != 1){
          const lengthDiffrence = this.pages.length - 10;
          this.pages.splice(0,lengthDiffrence);
        } else {
          this.pages = Array(10).fill(0).map((x: unknown, i: number) => i + 1);
        }
      }
  }
}
