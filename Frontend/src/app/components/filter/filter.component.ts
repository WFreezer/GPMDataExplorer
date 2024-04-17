import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SelectionService } from 'src/app/services/selection.service';
import { FilterService } from 'src/app/services/filter.service';

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


  constructor(
    private route: ActivatedRoute,
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
  }

  toggleDateRange(): void {
    this.isDateRangeOpen = !this.isDateRangeOpen;
    if (this.isDateRangeOpen) {
      this.loadAvailableDates();
    }
  }
  loadAvailableDates(): void {
    console.log("Productid: "+ this.productId);
    this.filterService.getAvailableDatesForProduct(this.productId).subscribe(
      (dates: any[]) => {
        console.log("dates: ", dates);
        this.availableStartDate = new Date(dates[0].start_date).toLocaleDateString();
        this.availableEndDate = new Date(dates[0].end_date).toLocaleDateString();
     
      },
      (error) => {
        console.error('Error obteniendo las fechas disponibles:', error);
      }
    );
  }
  clearDates(): void {
    this.startDate = null;
    this.endDate = null;
  }
}
