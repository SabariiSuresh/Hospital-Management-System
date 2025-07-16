import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    drawerOpened = false;

    constructor( private router : Router){}

    goToDashboard(){
      this.router.navigate(['/dashboard']);
    }

}
