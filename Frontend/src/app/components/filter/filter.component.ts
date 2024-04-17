import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  productId: number;
  sessionId: string;

  constructor(private route: ActivatedRoute,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    // Aquí recuperamos el session_id al inicializar el componente
    this.sessionId = this.sessionService.getSessionId() ;
    // Obtener radiometerId de los parámetros de ruta
    this.route.params.subscribe(params => {
      
      this.productId = params['productId'];
    });

    // Mostrar el product_id en la consola
    console.log('Estamos en filter component');
    console.log('Product ID:', this.productId);
    console.log('Session ID:', this.sessionId);
  }
}
