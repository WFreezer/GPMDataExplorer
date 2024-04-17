import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; 
import { RadiometerselectionComponent } from './components/radiometerselection/radiometerselection.component';
import { SatelliteselectionComponent } from './components/satelliteselection/satelliteselection.component';
import { FilterComponent

 } from './components/filter/filter.component';
const routes: Routes = [
  { path: '', component: HomeComponent }, // Esta es la ruta raíz que apunta al componente Home
  { path: 'radiometerselection', component: RadiometerselectionComponent },
  { path: 'satelliteselection/:radiometerId', component: SatelliteselectionComponent },
  { path: 'filter/:productId', component: FilterComponent }
  
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
