import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';
import * as L from 'leaflet';
(window as any).type = ''; // Declara y asigna un valor vacío a 'type' en el ámbito global

import 'leaflet-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  
  private map: any;
  private drawnItems: any; // Almacena las capas dibujadas
  private isRectangleDrawn: boolean = false; // Bandera para indicar si ya se ha dibujado un rectángulo
  private allowedBounds: any; // Limites permitidos para el dibujo del rectángulo
  public selectedCoordinates: string = '';
  productId: any;

  constructor(private route: ActivatedRoute, private router: Router, private filterService: FilterService) { }

  ngAfterViewInit(): void {
    // Obtener productId de los parámetros de ruta
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
    });
    this.initializeMap();
  }

  private initializeMap() {
    // Crear el mapa con la vista del mundo entero
    this.map = L.map('map').setView([0, 0], 2);

    // Agregar la capa de teselas
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    
    // Definir las coordenadas de la región permitida para dibujar el rectángulo
    const southWest = L.latLng(-70, -180);
    const northEast = L.latLng(70, 180);
    this.allowedBounds = L.latLngBounds(southWest, northEast);

    // Crear un rectángulo para visualizar las áreas permitidas
    L.rectangle(this.allowedBounds, {
      color: 'green',
      fillOpacity: 0.1
    }).addTo(this.map);
    
    // Ajustar la vista del mapa para mostrar la región permitida
    this.map.fitBounds(this.allowedBounds);

    // Inicializar Leaflet.draw
    this.drawnItems = new L.FeatureGroup();
    this.map.addLayer(this.drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        rectangle: {
          shapeOptions: {
            color: 'red'
          },
          repeatMode: false
        },
        circlemarker: false,
        circle: false,
        marker: false,
        polyline: false
      },
      edit: {
        featureGroup: this.drawnItems,
        remove: false
      }
    });

    this.map.addControl(drawControl);

    // Manejar el evento de dibujo completado
    this.map.on(L.Draw.Event.CREATED, (event: any) => {
      if (this.isRectangleDrawn) {
        this.drawnItems.clearLayers(); // Eliminar el rectángulo anterior si ya se ha dibujado uno
      }

      const layer = event.layer;
      const drawnRectangleBounds = layer.getBounds(); // Obtener los límites del rectángulo dibujado

      // Verificar si los límites del rectángulo dibujado están dentro de las coordenadas permitidas
      if (this.allowedBounds.contains(drawnRectangleBounds)) {
        this.drawnItems.addLayer(layer); // Agregar la capa dibujada al FeatureGroup
        this.isRectangleDrawn = true; // Establecer la bandera a true para indicar que se ha dibujado un rectángulo

        // Actualizar las coordenadas seleccionadas
        this.selectedCoordinates = this.getRectangleCoordinates(layer).join(', ');
        
        // Guardar las coordenadas utilizando el servicio
        this.filterService.setRectangleCoordinates(this.getRectangleCoordinates(layer));
      } else {
        // Mostrar un mensaje al usuario y eliminar el rectángulo dibujado
        this.drawnItems.clearLayers();
        alert('The rectangle must be within the allowed coordinates.');
      }
    });
  }

  saveRectangleCoordinates(): void {
    const layers = this.drawnItems.getLayers(); // Obtener todas las capas dibujadas
    if (layers.length > 0) {
      const rectangleLayer = layers[0]; // Suponiendo que solo haya un rectángulo dibujado
      const coordinates = this.getRectangleCoordinates(rectangleLayer);
      this.filterService.setRectangleCoordinates(coordinates); // Enviar las coordenadas al servicio
      this.router.navigate(['/filter', this.productId]);
    } else {
      console.log('No rectangle has been drawn.');
    }
  }
  
  private getRectangleCoordinates(layer: any): number[] {
    const bounds = layer.getBounds();
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();
    const coordinates = [
      southWest.lng.toFixed(2), // Longitud mínima
      southWest.lat.toFixed(2), // Latitud mínima
      northEast.lng.toFixed(2), // Longitud máxima
      northEast.lat.toFixed(2)  // Latitud máxima
    ];
    return coordinates;
  }
}
