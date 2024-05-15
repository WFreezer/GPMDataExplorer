import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DownloadServiceService } from 'src/app/services/download-service.service';

@Component({
  selector: 'app-data-download',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-download.component.html',
  styleUrl: './data-download.component.css'
})
export class DataDownloadComponent implements OnInit {
  idFilter: number; // Variable para almacenar el ID del filtro
  urls: string[] = []; // Arreglo para almacenar las URLs generadas

  constructor(private route: ActivatedRoute,private downloadService: DownloadServiceService) { }

  ngOnInit(): void {
    // Obtener filtroId de los parámetros de ruta
    this.route.params.subscribe(params => {
      this.idFilter = params['id_filter'];
    });
 
    console.log("idFilter: " + this.idFilter);
    // Llama al método para generar las URLs al inicializar el componente
    this.generarURLs();
  }

  generarURLs(): void {
    // Llama al servicio para generar las URLs
    this.downloadService.generarURL(this.idFilter).subscribe(
      (response) => {
        // Maneja la respuesta y asigna las URLs al arreglo urls
        this.urls = response.urls;
      },
      (error) => {
        console.error('Error al generar las URLs:', error);
        // Maneja el error aquí, como mostrar un mensaje de error al usuario
      }
    );
  }

  truncateUrl(url: string): string {
    const maxLength = 164; // Máxima longitud de la URL a mostrar
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  }
}