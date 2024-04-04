import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-radiometerselection',
  templateUrl: './radiometerselection.component.html',
  styleUrls: ['./radiometerselection.component.css']
})
export class RadiometerselectionComponent implements OnInit {
  sessionId: string | undefined;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    // Aquí recuperamos el session_id al inicializar el componente
    this.sessionId = this.sessionService.getSessionId();
    console.log('Session ID:', this.sessionId);
  }
}
