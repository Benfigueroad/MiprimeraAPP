import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})

export class CamaraPage implements OnInit {

  imageSource: string | null = null;

  constructor() { }

  ngOnInit() {
  }

  async takePicture() {
    try {
      const image: Photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
      });

      if (image && image.dataUrl) {
        this.imageSource = image.dataUrl;
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
