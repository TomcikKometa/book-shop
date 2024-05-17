import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'planet-paginator-page-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator-page-number.component.html',
  styleUrls: ['./paginator-page-number.component.scss']
})
export class PaginatorPageNumberComponent {
  @Input() public pageNumber: number = 1;
  @Input() public isActive: boolean = false;
  @Input() public index: number = 0;
}
