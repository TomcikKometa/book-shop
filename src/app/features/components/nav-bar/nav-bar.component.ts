import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { MainDashboardService } from '../../../api/services/main-dashboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  protected searchControl: FormControl = new FormControl<string>('');

  private readonly mainDashboardService: MainDashboardService =
    inject(MainDashboardService);
  private readonly distroyReference: DestroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed(this.distroyReference),debounceTime(500),distinctUntilChanged())
      .subscribe((value: string) =>
        this.mainDashboardService.searchBooks(value),
      );
  }
}
