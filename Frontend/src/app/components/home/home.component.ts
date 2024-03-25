// home.component.ts
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = '';
  showErrorMessage: boolean = false;


  constructor(private router: Router) {

  }
  comenzar() {
    if (this.username.trim() === '') {
      this.showErrorMessage = true;
    } else {
      console.log('Usuario ingresado:', this.username);
      
      this.router.navigate(['/home2']);
    }
  }
}