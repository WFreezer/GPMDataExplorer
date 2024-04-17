import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { SelectionService } from 'src/app/services/selection.service';

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

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private selectionService: SelectionService
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
  }
}
