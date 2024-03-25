import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Asegúrate de importar el componente Home

const routes: Routes = [
  { path: '', component: HomeComponent }, // Esta es la ruta raíz que apunta al componente Home
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
