import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DownloadService } from 'src/app/services/download.service';

@Component({
  selector: 'app-tableview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.css']
})
export class TableviewComponent implements OnInit {
  fecha: string;
  meteorologicalData: any[] = []; // Aquí almacenaremos los datos meteorológicos
  idFilter: number; // Variable para almacenar el ID del filtro

  constructor(private route: ActivatedRoute, private downloadService: DownloadService) { }

  ngOnInit(): void {
    // Obtener el parámetro de consulta 'date' y 'id_filter' de la URL
    this.route.queryParams.subscribe(params => {
      this.fecha = params['date'];
      this.idFilter = +params['id_filter']; // Convertir a número si es necesario
      // Llamar al método para obtener datos meteorológicos al inicializar el componente
      this.getMeteorologicalData();
    });
  }

  // Método para obtener datos meteorológicos usando el servicio
  getMeteorologicalData(): void {
    this.downloadService.getMeteorologicalData(this.idFilter, this.fecha)
      .subscribe(
        (data) => {
          this.meteorologicalData = data; // Asignar los datos recibidos a la propiedad meteorologicalData
          
        },
        (error) => {
          console.error('Error al obtener datos meteorológicos:', error);
          // Manejar el error según sea necesario
        }
      );
  }
}
