import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MainDashboardService,SearchType } from '../../../api/services/main-dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  protected searchControlTitle: FormControl = new FormControl<string>('');
  protected searchControlAuthor: FormControl = new FormControl<string>('');

  private readonly mainDashboardService: MainDashboardService =
    inject(MainDashboardService);
  private readonly distroyReference: DestroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.searchControlTitle.valueChanges
      .pipe(takeUntilDestroyed(this.distroyReference),debounceTime(500),distinctUntilChanged())
      .subscribe((value: string) =>
        this.mainDashboardService.searchBooks(value,SearchType.SEARCH_TITLE),
      );
      this.searchControlAuthor.valueChanges
      .pipe(takeUntilDestroyed(this.distroyReference),debounceTime(500),distinctUntilChanged())
      .subscribe((value: string) =>
        this.mainDashboardService.searchBooks(value,SearchType.SEARCH_AUTHOR),
      );
  }
}
