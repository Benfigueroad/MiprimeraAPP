import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BdserviceService } from 'src/app/services/bdservice.service'; // Asegúrate de proporcionar la ruta correcta

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private bdService: BdserviceService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    // Obtén las credenciales del usuario (puedes cambiar esto según cómo estés manejando la autenticación)
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (email && password) {
      // Verifica las credenciales utilizando el servicio
      const isAuthenticated = await this.bdService.verificarCredenciales(email, password);

      if (isAuthenticated) {
        return true; // Permite la activación de la ruta
      }
    }

    // Redirige al usuario a la página de inicio de sesión si no está autenticado
    return this.router.createUrlTree(['/login']);
  }
}
