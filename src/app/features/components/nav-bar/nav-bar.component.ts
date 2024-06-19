import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MainDashboardService, SearchType } from '../../../api/services/main-dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { BusketService } from '../../../api/services/busket/busket.service';
import { NavBarService } from '../../../api/services/nav-bar/nav-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  protected searchControlTitle: FormControl = new FormControl<string>('');
  protected searchControlAuthor: FormControl = new FormControl<string>('');
  protected searchControlEpoch: FormControl = new FormControl<string>('');

  private readonly mainDashboardService: MainDashboardService = inject(MainDashboardService);
  private readonly distroyReference: DestroyRef = inject(DestroyRef);
  public readonly router: BusketService = inject(BusketService);
  public readonly navbarService: NavBarService = inject(NavBarService);

  public ngOnInit(): void {
    this.searchControlTitle.valueChanges
      .pipe(takeUntilDestroyed(this.distroyReference), debounceTime(500), distinctUntilChanged())
      .subscribe((value: string) => this.mainDashboardService.searchBooks(value, SearchType.SEARCH_TITLE));
    this.searchControlAuthor.valueChanges
      .pipe(takeUntilDestroyed(this.distroyReference), debounceTime(500), distinctUntilChanged())
      .subscribe((value: string) => {this.mainDashboardService.searchBooks(value, SearchType.SEARCH_AUTHOR),console.log(value)});
    this.searchControlEpoch.valueChanges
      .pipe(takeUntilDestroyed(this.distroyReference), debounceTime(500), distinctUntilChanged())
      .subscribe((value: string) => this.mainDashboardService.searchBooks(value, SearchType.SEARCH_EPOCH));
  }
}
