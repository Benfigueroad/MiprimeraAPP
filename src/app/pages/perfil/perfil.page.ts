import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = {};

  constructor(private bdService: BdserviceService, private route: ActivatedRoute) { }

  ngOnInit() {

    const userId = this.route.snapshot.paramMap.get('userId');

    if (userId) {
      this.bdService.obtenerUsuarioPorId(userId).then((usuario) => {
        if (usuario) {
          this.usuario = usuario;
        }
      });
    }
  }
}
