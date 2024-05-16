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
import {MatIconModule} from '@angular/material/icon';
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
    MatIconModule
  ],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  public selectedNumberOfItems: number = 10;
  public pages: number[] = [];
  public numberOfPages$: Observable<number> = inject(MainDashboardService).numberOfPages;
  public numberOfPages:number = 0
  @Input() public currentPage: number = 1;
  public changedPage$: Subject<number> = new Subject<number>();

  public readonly paginatorSelectOptions: PaginatorSelectOptions[] = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
  ];

  private readonly distroyReference: DestroyRef = inject(DestroyRef);
  private readonly mainDashboardService: MainDashboardService = inject(MainDashboardService);

  public ngOnInit(): void {
    this.numberOfPages$.pipe(takeUntilDestroyed(this.distroyReference))
      .subscribe((value:number) => this.numberOfPages = value)
    this.pages = Array(this.numberOfPages)
      .fill(0)
      .map((x: unknown, i: number) => i + 1);
  }

  public changePage(page: number): void {
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
    this.mainDashboardService.changedPage(this.currentPage)
  }
}
