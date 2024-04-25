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
  startDate: Date | null = null;
  endDate: Date | null = null;
  availableStartDate: string | null = null;
  availableEndDate: string | null = null;

  isRegionRangeOpen: boolean = false;
  regionCoordinates: string = '';
  rectangleCoordinates: number[] = [];
  regionCoordinatesError: string | null = null; // Variable para mostrar errores de formato

  selectedVariables: { [key: number]: boolean } = {}; // Objeto para mantener el estado de selección de variables
  isSelectorVariablesOpen: boolean = false; // Agrega esta propiedad para controlar la visibilidad del contenedor de variables
  variables: any[] = []; // Agrega esta propiedad para almacenar las variables disponibles

  layers: any[] = []; // Propiedad para almacenar las capas disponibles
  selectedLayers: { [key: number]: boolean } = {}; // Objeto para mantener el estado de selección de las capas
  isSelectorLayersOpen: boolean = false; // Propiedad para controlar la visibilidad del contenedor de las capas

  filter: Filter = {
    id_filter: 0,
    product_id: 0,
    date_from: new Date(),
    date_to: new Date(),
    longitud_min: 0,
    longitud_max: 0,
    latitud_min: 0,
    latitud_max: 0,
    variable_ids: "",
    layer_ids: ""
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

    // Cargar las fechas disponibles
    this.loadAvailableDates();

    //Si se ha accedido a map, guarda las coordenadas del rectángulo
    this.rectangleCoordinates = this.filterService.getRectangleCoordinates();

    if (this.rectangleCoordinates.length) {
      this.isRegionRangeOpen = true;
      this.regionCoordinates = this.rectangleCoordinates.join(', ');
    }


  }

  toggleDateRange(): void {
    this.isDateRangeOpen = !this.isDateRangeOpen;
    this.isRegionRangeOpen = false;
    this.isSelectorVariablesOpen = false;
    this.isSelectorLayersOpen = false;
    if (this.isDateRangeOpen) {
      this.loadAvailableDates();
    }
  }

  toggleRegionRange(): void {
    this.isDateRangeOpen = false;
    this.isRegionRangeOpen = !this.isRegionRangeOpen;
    this.isSelectorVariablesOpen = false;
    this.isSelectorLayersOpen = false;
  }


  toggleSelectedVariables(): void {
    this.isSelectorVariablesOpen = !this.isSelectorVariablesOpen;
    this.isDateRangeOpen = false;
    this.isRegionRangeOpen = false;
    this.isSelectorLayersOpen = false;
    if (this.isSelectorVariablesOpen) {
      // Cargar las variables disponibles
      this.loadVariables();
    }
  }
  toggleSelectedLayers(): void {
    this.isSelectorLayersOpen = !this.isSelectorLayersOpen;
    this.isDateRangeOpen = false;
    this.isSelectorVariablesOpen = false;
    this.isRegionRangeOpen = false;
    if (this.isSelectorLayersOpen) {
      // Carga las capas disponibles
      this.loadLayers();
    }
  }

  loadAvailableDates(): void {
    this.filterService.getAvailableDatesForProduct(this.productId).subscribe(
      (dates: any[]) => {
        this.availableStartDate = new Date(dates[0].start_date).toISOString().split('T')[0];
        this.availableEndDate = new Date(dates[0].end_date).toISOString().split('T')[0];

      },
      (error) => {
        console.error('Error obteniendo las fechas disponibles:', error);
      }
    );
  }

  dateLoad(): void {

    this.filterService.setStartDate(this.startDate);
    this.filterService.setEndDate(this.endDate);
    console.log("dateLoad()");
    console.log("dateLoad().startDate: " + this.startDate);
    console.log("dateLoad().endDate: " + this.endDate);
    // Cierra el rango de fechas
    this.toggleDateRange();
  }


  goToMap(): void {
    this.router.navigate(['/map', this.productId]);
  }



  areVariablesSelected(): boolean {
    return Object.values(this.selectedVariables).some(value => value);
  }


  loadVariables(): void {

    this.filterService.getVariables().subscribe(
      (data: any[]) => {
        this.variables = data;
      },
      (error) => {
        console.error('Error obteniendo las variables:', error);
      }
    );
  }

  loadLayers(): void {
    this.filterService.getLayers().subscribe(
      (data: any[]) => {
        this.layers = data;
      },
      (error) => {
        console.error('Error obteniendo las capas:', error);
      }
    );
  }

  createFilter(): void {
    // Verifica que todos los campos estén llenos
    if (!this.filter.product_id || !this.filter.date_from || !this.filter.date_to ||
      !this.filter.longitud_min || !this.filter.longitud_max || !this.filter.latitud_min ||
      !this.filter.latitud_max || !this.filter.variable_ids || !this.filter.layer_ids) {
      alert('Por favor, complete todos los campos para crear el filtro.');
      return;
    }
    //Product_id 
    this.filter.product_id = this.productId;
    // Asigna las fechas seleccionadas
    this.filter.date_from = this.filterService.getStartDate();
    this.filter.date_to = this.filterService.getEndDate();
    ;
    // Procesa las coordenadas de región ingresadas por el usuario
    const coordinates = this.regionCoordinates.split(',').map(coord => parseFloat(coord.trim()));
    console.log("Long_min22222: " + this.filter.longitud_min);
    if (coordinates.length === 4 && !coordinates.some(isNaN)) {
      this.filter.longitud_min = coordinates[0];
      this.filter.latitud_min = coordinates[1];
      this.filter.longitud_max = coordinates[2];
      this.filter.latitud_max = coordinates[3];
      this.regionCoordinatesError = null; // Reinicia el mensaje de error si las coordenadas son válidas
    } else {
      this.regionCoordinatesError = 'Las coordenadas deben ser cuatro números separados por comas.';
    }

    // Obtén los IDs de las variables seleccionadas y guárdalos en filter.variable_ids
    const selectedVariableIds = Object.entries(this.selectedVariables)
      .filter(([_, isSelected]) => isSelected)
      .map(([variableId, _]) => variableId);

    this.filter.variable_ids = selectedVariableIds.join(',');

    // Obtén los IDs de las capas seleccionadas y guárdalos en filter.layer_ids
    const selectedLayerIds = Object.entries(this.selectedLayers)
      .filter(([_, isSelected]) => isSelected)
      .map(([layerId, _]) => layerId);

    this.filter.layer_ids = selectedLayerIds.join(',');

    // Log de verificación
    console.log('startDate:', this.filter.date_from);
    console.log('endDate:', this.filter.date_to);
    console.log('Longitude Min:', this.filter.longitud_min);
    console.log('Longitude Max:', this.filter.longitud_max);
    console.log('Latitude Min:', this.filter.latitud_min);
    console.log('Latitude Max:', this.filter.latitud_max);
    console.log('Variable IDs:', this.filter.variable_ids);
    console.log('Layer IDs:', this.filter.layer_ids);
    console.log('Filtro:' + this.filter);

    // Llama al servicio para crear el filtro
    this.filterService.createFilter(this.filter).subscribe(
      (response) => {
        const filtroId = response.filter; // Obtiene solo el ID del filtro
        console.log('ID del filtro creado:', filtroId);
      },
      (error) => {
        console.error('Error al crear el filtro:', error);
        // Maneja el error aquí, como mostrar un mensaje de error al usuario
      }
    );
  }


}
