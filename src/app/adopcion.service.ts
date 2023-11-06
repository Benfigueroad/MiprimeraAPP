import { Injectable } from '@angular/core';
import { Adopcion } from './adopcion.model'; 

@Injectable({
  providedIn: 'root',
})
export class AdopcionService {
  private adopciones: Adopcion[] = []; 

  constructor() {}

  guardarAdopcion(adopcion: Adopcion) {
    this.adopciones.push(adopcion);
  }

  obtenerAdopciones() {
    return this.adopciones;
  }
}
