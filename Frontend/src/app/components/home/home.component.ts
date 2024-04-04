// home.component.ts

import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { SessionModel } from 'src/app/models/session.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string = '';
  showErrorMessage: boolean = false;
  session: SessionModel | undefined;

  constructor(private router: Router, private sessionService: SessionService) {}

  comenzar() {
    if (this.username.trim() === '') {
      this.showErrorMessage = true;
    } else {
      console.log('Usuario ingresado:', this.username);
      this.sessionService.setUsername(this.username);
      this.sessionService.createSession(this.username).subscribe(
        response => {
          console.log('Sesión creada:', response);
          this.session = response; // Asignar la respuesta completa a la propiedad session
         
          this.sessionService.setSessionId(response.session_id); // Utilizar response.session_id
          
         
          // Navegar a la página 'radiometerselection' con el ID de sesión como parámetro
          this.router.navigate(['/radiometerselection']);
        },
        error => {
          console.error('Error al crear la sesión:', error);
        }
      );
    }
  }
}
