import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadosComponent } from './empleados.component';

@NgModule({
  declarations: [EmpleadosComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [EmpleadosComponent],
})
export class EmpleadoModule { }