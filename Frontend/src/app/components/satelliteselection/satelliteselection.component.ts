import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionService } from 'src/app/services/selection.service';
import { SessionService } from 'src/app/services/session.service';
import { Radiometer } from 'src/app/models/radiometer.model';
import { Satellite } from 'src/app/models/satellite.model';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-satelliteselection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './satelliteselection.component.html',
  styleUrl: './satelliteselection.component.css'
})
export class SatelliteselectionComponent {
  sessionId: string ; // Valor predeterminado vacío
  radiometerId: number= 0;
  radiometer: Radiometer | undefined;
  satellites: Satellite[] = [];

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private sessionService: SessionService, 
    private selectionService: SelectionService) { }

  ngOnInit(): void {
    // Aquí recuperamos el session_id al inicializar el componente
    this.sessionId = this.sessionService.getSessionId() ;
    console.log('Session id: ' + this.sessionId);
    // Obtener radiometerId de los parámetros de ruta
    this.route.params.subscribe(params => {
      
      this.radiometerId = params['radiometerId'];
    });

    // Llamar al método para obtener el radiómetro por su ID
     // Verificar si radiometerId es undefined antes de llamar al método getRadiometerById
     if (this.radiometerId !== undefined) 
    this.getRadiometerById(this.radiometerId);
     this.loadSatellites();
        
  }

  getRadiometerById(radiometerId: number): void {
    this.selectionService.getRadiometerById(radiometerId).subscribe(
      radiometer => {
        this.radiometer = radiometer;
      },
      error => {
        console.error('Error fetching radiometer by ID:', error);
      }
    );
  }

  //Carga todos los satellites
  loadSatellites(): void {
    this.selectionService.getAllSatellitesByRadiometerId(this.radiometerId).subscribe(
      satellites => {
        this.satellites =satellites;
      },
      error => {
        console.error('Error fetching radiometers:', error);
      }
    );
  }
  
 //Selecciona satelite desde html
  selectSatellite(satellite: Satellite): void {
    

    // Llama al servicio para crear un nuevo producto
    this.selectionService.createProduct(this.sessionId, this.radiometerId, satellite.satellite_id).subscribe(
      (product: ProductModel) => {
        this.selectionService.setSatelliteName(satellite.shortname);
        console.log(satellite.shortname);
          // Navegar a la vista filter con el ID del product como parámetro
         this.router.navigate(['/filter', product.product_id]);
      },
      error => {
        // Maneja los errores en caso de que ocurran
        console.error('Error creating product:', error);
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
      }
    );
  }
}