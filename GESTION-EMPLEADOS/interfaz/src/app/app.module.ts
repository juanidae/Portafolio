import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'; 
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import{MenuUsuarioComponent} from './components/menu_usuario/menu_usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
