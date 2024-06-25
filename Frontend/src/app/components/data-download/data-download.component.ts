import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadService } from 'src/app/services/download.service';



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
  fechas: string[] = [];
  
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
    this.downloadService.generarURL(this.idFilter).subscribe(
      (response) => {
        this.urls = response.urls;
        this.fechas = this.urls.map(url => this.extraerFecha(url));
      },
      (error) => {
        console.error('Error al generar las URLs:', error);
      }
    );
  }

  extraerFecha(url: string): string {
    const regex = /(\d{4})(\d{2})(\d{2})-S\d{6}-E\d{6}/;
    const match = url.match(regex);
  
    if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
  
      // Formato YYYY-MM-DD
      return `${year}-${month}-${day}`;
    } else {
      return 'Fecha no encontrada en la URL';
    }
  }
  

  

  truncateUrl(url: string): string {
    const maxLength = 164; // Máxima longitud de la URL a mostrar
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  }


  redirectToTable(fecha: string): void {
    this.downloadService.importCSV(this.idFilter, fecha).subscribe(
      (response) => {
        console.log('CSV import successful:', response);
        this.router.navigate(['/table-view'], { queryParams: { date: fecha, id_filter: this.idFilter } });
      },
      (error) => {
        console.error('Error importing CSV:', error);
        // Aquí puedes manejar el error del servicio si es necesario
      }
    );

    
   
  }


  navigateToRadiometerSelection(): void {
    this.router.navigate(['radiometerselection']); // Navega al componente RadiometerselectionComponent
  }

  
}