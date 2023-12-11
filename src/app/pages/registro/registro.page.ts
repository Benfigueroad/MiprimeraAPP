import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    private bdService: BdserviceService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.bdService.initDatabase();
  }

  async guardar() {
    const nuevoUsuario = {
      nombre: 'Jo',
      apellido: 'Do',
      email: 'ejemplo@example.com',
      telefono: '967845635',
      password: 'contrasena123'
    };

    await this.bdService.insertarUsuario(nuevoUsuario);


    const toast = await this.toastController.create({
      message: 'Usuario registrado correctamente',
      duration: 2000,
      position: 'bottom'
    });

    await toast.present();


    this.navCtrl.navigateForward('/animales');
  }
}
