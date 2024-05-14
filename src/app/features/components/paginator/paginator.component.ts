import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { PaginatorPageNumberComponent } from './paginator-page-number/paginator-page-number.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

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
  imports: [MatIconModule,PaginatorPageNumberComponent,MatFormFieldModule,CommonModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  public selectedNumberOfItems: number = 10;
  public pages: number[] = []; 
  @Input() public numberOfPages: number = 0;
  @Input() public currentPage: number = 1;
  @Output() public readonly paginationChange: EventEmitter<PaginationOptions> = new EventEmitter<PaginationOptions>();

  public readonly paginatorSelectOptions: PaginatorSelectOptions[] = [
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 }
  ];

  public ngOnInit(): void {
    this.pages = Array(this.numberOfPages)
      .fill(0)
      .map((x: unknown, i: number) => i + 1);
  }

  public changePage(page: number): void {
    this.currentPage = page;
    this.handlePaginationChange();
  }

  public moveBackwardPage(): void{
    if(this.currentPage > 1){
      this.currentPage = this.currentPage - 1;
      this.handlePaginationChange();
    }
  }

  public moveForwardPage(): void{
    if(this.numberOfPages > this.currentPage){
      this.currentPage = this.currentPage + 1;
      this.handlePaginationChange();
    }
  }

  public handlePaginationChange(): void {
    this.paginationChange.next({ currentPage: this.currentPage, numberOfItems: this.selectedNumberOfItems });
  }
}
