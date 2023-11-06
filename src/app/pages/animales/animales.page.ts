import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdopcionService } from '../../adopcion.service';


@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})

export class AnimalesPage {
  animalesDisponibles = [
    {
      nombre: '',
      raza: '',
      imagen: '',
      descripcion: ''
    },

  ];

  constructor(private adopcionService: AdopcionService, private router: Router) { }

  ngOnInit() {
    this.animalesDisponibles = this.adopcionService.obtenerAdopciones();
  }

  nuevaAdopcion() {
    this.router.navigate(['/nueva-adopcion']);
  }
}
