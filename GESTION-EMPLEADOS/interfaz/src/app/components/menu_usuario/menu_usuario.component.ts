// login.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OnInit } from '@angular/core';

interface Usuario {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'menu-usuario',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './menu_usuario.component.html',
  styleUrls: ['./menu_usuario.css']
})
export class MenuUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  filteredUsers: Usuario[] = [];

  currentUser: Usuario = this.getEmptyUser();
  isEditMode: boolean = false;

  searchTerm: string = '';

  private nextId = 1;

  constructor() {}

  ngOnInit(): void {
    // Puedes cargar usuarios iniciales aquí o dejar vacío
    this.usuarios = [
      { id: this.nextId++, name: 'Juan Pérez', email: 'juan@example.com' },
      { id: this.nextId++, name: 'María Gómez', email: 'maria@example.com' }
    ];
    this.filteredUsers = [...this.usuarios];
  }

  getEmptyUser(): Usuario {
    return { id: 0, name: '', email: '' };
  }

  onSubmit(): void {
    if (this.isEditMode) {
      // Actualizar usuario existente
      const index = this.usuarios.findIndex(u => u.id === this.currentUser.id);
      if (index !== -1) {
        this.usuarios[index] = { ...this.currentUser };
      }
      this.isEditMode = false;
    } else {
      // Crear nuevo usuario
      this.currentUser.id = this.nextId++;
      this.usuarios.push({ ...this.currentUser });
    }
    this.resetForm();
    this.filterUsers();
  }

  editUser(user: Usuario): void {
    this.currentUser = { ...user };
    this.isEditMode = true;
  }

  deleteUser(user: Usuario): void {
    this.usuarios = this.usuarios.filter(u => u.id !== user.id);
    this.filterUsers();
    // Si el usuario que estaba editando se elimina, limpiar formulario
    if (this.isEditMode && this.currentUser.id === user.id) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.currentUser = this.getEmptyUser();
    this.isEditMode = false;
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (term === '') {
      this.filteredUsers = [...this.usuarios];
    } else {
      this.filteredUsers = this.usuarios.filter(u =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      );
    }
  }

}