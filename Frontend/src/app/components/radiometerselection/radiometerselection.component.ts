import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { SelectionService } from 'src/app/services/selection.service';
import { Radiometer } from 'src/app/models/radiometer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radiometerselection',
  templateUrl: './radiometerselection.component.html',
  styleUrls: ['./radiometerselection.component.css']
})
export class RadiometerselectionComponent implements OnInit {
  sessionId: string | undefined;
  radiometers: Radiometer[] = [];

  constructor(private router: Router, private sessionService: SessionService, private selectionService: SelectionService) { }

  ngOnInit(): void {
    // Aquí recuperamos el session_id al inicializar el componente
    this.sessionId = this.sessionService.getSessionId();
    console.log('Session id: ' + this.sessionId);
    //Carga radiometers disponibles
    this.loadRadiometers();
  }

  loadRadiometers(): void {
    this.selectionService.getAllRadiometers().subscribe(
      radiometers => {
        this.radiometers = radiometers;
      },
      error => {
        console.error('Error fetching radiometers:', error);
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
      }
    );
  }

  selectRadiometer(radiometer: Radiometer): void {
    this.selectionService.setRadiometerName(radiometer.name);
    console.log(radiometer.name);
    // Navegar a la vista SatelliteSelection con el ID del radiómetro como parámetro
  this.router.navigate(['/satelliteselection', radiometer.radiometer_id]);
  }
  
}

