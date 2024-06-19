import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadService } from 'src/app/services/download.service';
import { FilterService } from 'src/app/services/filter.service';



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
  productId: number;
  selectedFile: File;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private downloadService: DownloadService) { }

  ngOnInit(): void {
    // Obtener filtroId de los parámetros de ruta
    this.route.params.subscribe(params => {
      this.idFilter = params['id_filter'];
    });
 
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
      }
    );
  }

  truncateUrl(url: string): string {
    const maxLength = 164; // Máxima longitud de la URL a mostrar
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  }




  navigateToRadiometerSelection(): void {
    this.router.navigate(['radiometerselection']); // Navega al componente RadiometerselectionComponent
  }

  
}