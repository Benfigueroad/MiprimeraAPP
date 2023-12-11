import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BdserviceService } from 'src/app/services/bdservice.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private bdService: BdserviceService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (email && password) {
      
      const isAuthenticated = await this.bdService.verificarCredenciales(email, password);

      if (isAuthenticated) {
        return true; 
      }
    }

  
    return this.router.createUrlTree(['/login']);
  }
}
