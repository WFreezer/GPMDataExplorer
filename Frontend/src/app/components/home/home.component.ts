// home.component.ts
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = '';
  showErrorMessage: boolean = false;


  constructor(private router: Router, private sessionService: SessionService) {

  }
  comenzar() {
    if (this.username.trim() === '') {
      this.showErrorMessage = true;
    } else {
      console.log('Usuario ingresado:', this.username);
      this.sessionService.setUsername(this.username);
      this.sessionService.createSession(this.username).subscribe(
        response => {
          console.log('Sesión creada:', response);
          // Realizar acciones adicionales después de crear la sesión si es necesario
        },
        error => {
          console.error('Error al crear la sesión:', error);
          // Manejar el error de acuerdo a tus necesidades
        }
      );
    }
  }
}