import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionService } from 'src/app/services/selection.service';
import { SessionService } from 'src/app/services/session.service';
import { Radiometer } from 'src/app/models/radiometer.model';
import { Satellite } from 'src/app/models/satellite.model';
import { response } from 'express';
@Component({
  selector: 'app-satelliteselection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './satelliteselection.component.html',
  styleUrl: './satelliteselection.component.css'
})
export class SatelliteselectionComponent {
  sessionId: string | undefined;
  radiometerId: number= 0;
  radiometer: Radiometer | undefined;
  satellites: Satellite[] = [];

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

    // Llamar al método para obtener el radiómetro por su ID
     // Verificar si radiometerId es undefined antes de llamar al método getRadiometerById
     if (this.radiometerId !== undefined) 
    this.getRadiometerById(this.radiometerId);
     this.loadSatellites();
    

    console.log('Session ID:', this.sessionId);
    console.log('Radiometer ID:', this.radiometerId);
    
  
  }

  getRadiometerById(radiometerId: number): void {
    this.selectionService.getRadiometerById(radiometerId).subscribe(
      radiometer => {
        this.radiometer = radiometer;
        console.log('Radiometer Name:', this.radiometer.name);
      },
      error => {
        console.error('Error fetching radiometer by ID:', error);
        // Manejar el error si es necesario
      }
    );
  }

  //Carga todos los satellites
  loadSatellites(): void {
    console.log("SatellitesLoad");
    this.selectionService.getAllSatellitesByRadiometerId(this.radiometerId).subscribe(
      satellites => {
        this.satellites =satellites;
        console.log("Satellites: "+ this.satellites);
      },
      error => {
        console.error('Error fetching radiometers:', error);
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
      }
    );
  }
 //Selecciona satelite desde html
  selectSatellite(satellite: Satellite): void {
    // Imprimir el ID del radiómetro seleccionado en la consola
    console.log('ID del radiómetro seleccionado:',satellite.radiometer_id);

    
  }
  
}