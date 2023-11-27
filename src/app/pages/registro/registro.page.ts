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
  ) {}

  ngOnInit() {
    // Llama a la función para inicializar la base de datos desde tu servicio
    this.bdService.initDatabase();
  }

  async guardar() {
    // Insertar un nuevo usuario en la base de datos
    const nuevoUsuario = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'john.doe@example.com',
      password: 'contrasena123'
    };

    await this.bdService.insertarUsuario(nuevoUsuario);

    // Mostrar mensaje de usuario registrado
    const toast = await this.toastController.create({
      message: 'Usuario registrado correctamente',
      duration: 2000,
      position: 'bottom'
    });

    await toast.present();

    // Navegar a la página de animales
    this.navCtrl.navigateForward('/animales');
  }
}
