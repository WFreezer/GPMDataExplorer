import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionService } from 'src/app/services/selection.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-satelliteselection',
  standalone: true,
  imports: [],
  templateUrl: './satelliteselection.component.html',
  styleUrl: './satelliteselection.component.css'
})
export class SatelliteselectionComponent {
  sessionId: string | undefined;
  radiometerId: number | undefined;
  
  constructor(private router: Router, 
    private route: ActivatedRoute,
    private sessionService: SessionService, 
    private selectionService: SelectionService) { }

  ngOnInit(): void {
    // Aquí recuperamos el session_id al inicializar el componente
    this.sessionId = this.sessionService.getSessionId();
    // Obtener radiometerId de los parámetros de ruta
    this.route.params.subscribe(params => {
      
      this.radiometerId = params['radiometerId'];
    });

    console.log('Session ID:', this.sessionId);
    console.log('Radiometer ID:', this.radiometerId);
    
  
    
  }
}
