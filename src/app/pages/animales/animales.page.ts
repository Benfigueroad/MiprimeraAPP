import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AdopcionService } from '../../adopcion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit, OnDestroy {
  animalesDisponibles: any[] = [];
  private adopcionesSubscription: Subscription = new Subscription();

  constructor(private adopcionService: AdopcionService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.adopcionesSubscription = this.adopcionService.adopciones$.subscribe(adopciones => {
      this.animalesDisponibles = adopciones;
    });
  
    this.adopcionService.obtenerAdopciones().then(() => {
      // Puedes realizar cualquier otra lógica después de cargar las adopciones
    });
  }

  ngOnDestroy() {
    // Desuscribe la suscripción para evitar fugas de memoria
    this.adopcionesSubscription.unsubscribe();
  }

  nuevaAdopcion() {
    this.router.navigate(['/nueva-adopcion']);
  }

  abrirMapa() {
    this.navCtrl.navigateForward('/mapa');
  }
}
