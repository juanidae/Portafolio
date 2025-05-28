import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuUsuarioComponent } from './components/menu_usuario/menu_usuario.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms'; 
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Login';
}
