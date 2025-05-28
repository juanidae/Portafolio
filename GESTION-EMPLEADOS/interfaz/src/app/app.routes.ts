// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {MenuUsuarioComponent} from './components/menu_usuario/menu_usuario.component';
// import { ServiciosComponent } from './servicios/servicios.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta por defecto (login)
  { path: 'usuarios', component: MenuUsuarioComponent },      // Ruta al menú
  //{ path: 'servicios', component: ServiciosComponent }, // Ruta a servicios
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
