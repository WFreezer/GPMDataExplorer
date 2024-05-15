import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { RadiometerselectionComponent } from './components/radiometerselection/radiometerselection.component';
import { SatelliteselectionComponent } from './components/satelliteselection/satelliteselection.component';
import { FilterComponent } from './components/filter/filter.component';
import { MapComponent } from './components/map/map.component';
import { DataDownloadComponent } from './components/data-download/data-download.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Esta es la ruta raíz que apunta al componente Home
  { path: 'radiometerselection', component: RadiometerselectionComponent },
  { path: 'satelliteselection/:radiometerId', component: SatelliteselectionComponent },
  { path: 'filter/:productId', component: FilterComponent },
  { path: 'map/:productId', component: MapComponent },
  { path: 'data-download/:id_filter', component: DataDownloadComponent } // Agrega la ruta para el componente DataDownloadComponent
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
