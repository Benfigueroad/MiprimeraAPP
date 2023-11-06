import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdopcionService } from '../../adopcion.service';

@Component({
  selector: 'app-nueva-adopcion',
  templateUrl: './nueva-adopcion.page.html',
  styleUrls: ['./nueva-adopcion.page.scss'],
})
export class NuevaAdopcionPage {
  nuevoAnimal = {
    nombre: '',
    raza: '',
    imagen: '',
    descripcion: '',
  };

  constructor(private adopcionService: AdopcionService, private router: Router) { }

  guardarAdopcion() {
    this.adopcionService.guardarAdopcion(this.nuevoAnimal);
    this.router.navigate(['/animales']);
  }
}

