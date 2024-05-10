import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  valueChange($event: any) {
    console.log($event);
    }
      title:string = '';
      author:string = '';
    
      log(){
       console.log(this.title,this.author);
      }
}
