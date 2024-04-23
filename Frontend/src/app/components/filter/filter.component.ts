import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SelectionService } from 'src/app/services/selection.service';
import { FilterService } from 'src/app/services/filter.service';
import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  productId: number;
  sessionId: string;
  radiometerName: string;
  satelliteName: string;
  isDateRangeOpen: boolean = false;
  isRegionRangeOpen: boolean = false;
  startDate: Date | null = null;
  endDate: Date | null = null;
  availableStartDate: string | null = null;
  availableEndDate: string | null = null;
  regionCoordinates: string = '';
  rectangleCoordinates: number[] = [];
  regionCoordinatesError: string | null = null; // Variable para mostrar errores de formato
  
  filter: Filter = {
    id_filter: 0,
    product_id: 0,
    date_from: new Date(),
    date_to: new Date(),
    longitud_min: 0,
    longitud_max: 0,
    latitud_min: 0,
    latitud_max: 0,
    variable_id: 0,
    layer_id: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private selectionService: SelectionService, 
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    // Aquí recuperamos el session_id al inicializar el componente
    this.sessionId = this.sessionService.getSessionId();
    console.log('Session id: ' + this.sessionId);
    // Obtener productId de los parámetros de ruta
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });
  
    // Obtener el nombre del radiómetro seleccionado del servicio de selección
    this.radiometerName = this.selectionService.getRadiometerName();
    // Obtener el nombre del satélite seleccionado del servicio de selección
    this.satelliteName = this.selectionService.getSatelliteName();
  
   
  
    this.loadAvailableDates();
  
    //Si se ha accedido a map guarda las coordenadas del rectangulo
    this.rectangleCoordinates = this.filterService.getRectangleCoordinates();
    console.log("RectangleCoordenates: " + this.rectangleCoordinates);
    if(this.rectangleCoordinates.length){
      this.isRegionRangeOpen=true;
      this.regionCoordinates = this.rectangleCoordinates.join(', ');
    }
    console.log("RegionCoordinates: " + this.regionCoordinates);
  }
  
  toggleDateRange(): void {
    this.isDateRangeOpen = !this.isDateRangeOpen;
    this.isRegionRangeOpen = false;
    if (this.isDateRangeOpen) {
      this.loadAvailableDates();
    }
  }

  loadAvailableDates(): void {
    this.filterService.getAvailableDatesForProduct(this.productId).subscribe(
      (dates: any[]) => {
        this.availableStartDate = new Date(dates[0].start_date).toISOString().split('T')[0];
        this.availableEndDate = new Date(dates[0].end_date).toISOString().split('T')[0];
        console.log('Available End Date:', this.availableStartDate);
        console.log('Available End Date:', this.availableEndDate);
      },
      (error) => {
        console.error('Error obteniendo las fechas disponibles:', error);
      }
    );
  }

  dateLoad(): void {
    this.filterService.setStartDate(this.startDate);
    this.filterService.setEndDate(this.endDate);
    // Cierra el rango de fechas
    this.toggleDateRange();
  }
  

  goToMap(): void {
    
    this.router.navigate(['/map', this.productId]);
  }

  toggleRegionRange(): void {
    this.isDateRangeOpen = false;
    this.isRegionRangeOpen = !this.isRegionRangeOpen;
    console.log('isRegionRangeOpen:', this.isRegionRangeOpen); // Agregar este console.log
}


  createFilter(): void {
    // Asigna las fechas seleccionadas
    this.filter.date_from = this.filterService.getStartDate();
    this.filter.date_to = this.filterService.getEndDate();

    
    // Procesa las coordenadas de región ingresadas por el usuario
    const coordinates = this.regionCoordinates.split(',').map(coord => parseFloat(coord.trim()));
    console.log("Long_min22222: "+ this.filter.longitud_min);
     if (coordinates.length === 4 && !coordinates.some(isNaN)) {
      this.filter.longitud_min = coordinates[0];
      this.filter.latitud_min = coordinates[1];
      this.filter.longitud_max = coordinates[2];
      this.filter.latitud_max = coordinates[3];
      this.regionCoordinatesError = null; // Reinicia el mensaje de error si las coordenadas son válidas
    } else {
      this.regionCoordinatesError = 'Las coordenadas deben ser cuatro números separados por comas.';
    }
  

    // Log de verificación
    console.log('Ok startDate:', this.startDate);
    console.log('Ok endDate:', this.endDate);
    console.log('Longitude Min:', this.filter.longitud_min);
    console.log('Longitude Max:', this.filter.longitud_max);
    console.log('Latitude Min:', this.filter.latitud_min);
    console.log('Latitude Max:', this.filter.latitud_max);
  }
}
