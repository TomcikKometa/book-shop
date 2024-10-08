import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { PaginatorPageNumberComponent } from './paginator-page-number/paginator-page-number.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MainDashboardService } from '../../../api/services/main-dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface PaginationOptions {
  currentPage?: number;
  numberOfItems?: number;
}

@Component({
  selector: 'planet-paginator',
  standalone: true,
  imports: [PaginatorPageNumberComponent, MatFormFieldModule, CommonModule, MatIconModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  protected pages: any[] = [];
  protected increasedPage = 10;
  protected numberOfPages: number = 0;
  private filtered: number = 0;
  private paginationObject = {
    previousValue: 0,
    currentValue: 1,
    nextValue: 0
  };
  @Input() public currentPage: number = 1;

  protected readonly numberOfPages$: Observable<number> = inject(MainDashboardService).numberOfPages;
  protected readonly filtered$: Observable<number> = inject(MainDashboardService).isFiltered;
  private readonly distroyReference: DestroyRef = inject(DestroyRef);
  private readonly mainDashboardService: MainDashboardService = inject(MainDashboardService);

  public ngOnInit(): void {
    this.numberOfPages$.pipe(takeUntilDestroyed(this.distroyReference)).subscribe((value: number) => {
      this.numberOfPages = value;
      this.preparePagesToLoad(this.numberOfPages);
    });
    this.filtered$.pipe(takeUntilDestroyed(this.distroyReference)).subscribe((value: number) => {
      this.filtered = value;

      if(this.filtered === (0 || 1)){
        this.increasedPage = 10;
        this.currentPage = 1
      }
    });
  }

  protected changePage(page: number): void {
    this.paginationObject.previousValue = this.currentPage;
    this.paginationObject.currentValue = page;
    this.currentPage = page;
    this.mainDashboardService.changedPage(page);
  }

  protected moveBackwardPage(): void {
    if (this.currentPage >= 2) {
      this.paginationObject.previousValue = this.currentPage;
      this.currentPage = this.currentPage - 1;
      this.paginationObject.currentValue = this.currentPage;
      this.mainDashboardService.changedBackwardPage(this.currentPage);
    }
  }

  protected moveForwardPage(): void {
    if (this.numberOfPages > this.currentPage) {
      this.paginationObject.previousValue = this.currentPage;
      this.currentPage = this.currentPage + 1;
      this.paginationObject.currentValue = this.currentPage;
      this.mainDashboardService.changedFarwardPage(this.currentPage);
    }
  }

  private preparePagesToLoad(numberOfPages: number) {
    if (this.paginationObject.previousValue < this.paginationObject.currentValue) {

      if (numberOfPages < 10) {
        this.pages = Array(numberOfPages)
          .fill(0)
          .map((x: unknown, i: number) => i + 1);
      } else {

        let start = this.increasedPage++;
        if (start < 10) {
          start = this.numberOfPages;
        }

        let removeInxdex = this.increasedPage - 11;
        this.pages = Array(start)
          .fill(0)
          .map((x: unknown, i: number) => i + 1);

        this.pages.splice(0, removeInxdex);
      }
    }

    if (this.paginationObject.previousValue > this.paginationObject.currentValue) {
      
      if (numberOfPages < 10) {
        this.pages = Array(numberOfPages)
          .fill(0)
          .map((x: unknown, i: number) => i + 1);
      }
      if (numberOfPages > 10) {
        let start = this.increasedPage--;

        if (start <= 11) {
          start = 10;
        }

        this.pages = Array(start)
          .fill({}, 2)
          .map((x: unknown, i: number) => i - 1);

        if (start > 10 && this.pages.indexOf(0) != 1) {
          const lengthDiffrence = this.pages.length - 10;
          this.pages.splice(0, lengthDiffrence);
        } else {
          this.pages = Array(10)
            .fill(0)
            .map((x: unknown, i: number) => i + 1);
        }
      }
    }
  }
}
