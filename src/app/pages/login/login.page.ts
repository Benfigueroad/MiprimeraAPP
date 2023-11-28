import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private router: Router, private bdService: BdserviceService) { }

  async onSubmit() {
    const result = await this.bdService.verificarCredenciales(this.email, this.password);

    if (result.authenticated) {

      localStorage.setItem('userId', result.user.id);

      this.router.navigate(['/animales']);
    } else {
      console.log('Credenciales no válidas');
    }
  }

  ngOnInit() {
  }
}
