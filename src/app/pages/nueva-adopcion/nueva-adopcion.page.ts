import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdopcionService } from '../../adopcion.service';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';

interface NuevoAnimal {
  nombre: string;
  raza: string;
  imagen: string;
  descripcion: string;
}

@Component({
  selector: 'app-nueva-adopcion',
  templateUrl: './nueva-adopcion.page.html',
  styleUrls: ['./nueva-adopcion.page.scss'],
})

export class NuevaAdopcionPage {
  nuevoAnimal: NuevoAnimal = {
    nombre: '',
    raza: '',
    imagen: '',
    descripcion: '',
  };

  constructor(private adopcionService: AdopcionService, private router: Router) { }

  async guardarAdopcion() {
    await this.adopcionService.guardarAdopcion(this.nuevoAnimal);
    this.router.navigate(['/animales']);
  }

  async seleccionarImagen() {
    try {
      const imageOptions: ImageOptions = {
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      };

      const capturedImage: Photo = await Camera.getPhoto(imageOptions);
      this.nuevoAnimal.imagen = capturedImage?.dataUrl || '';
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }
}
