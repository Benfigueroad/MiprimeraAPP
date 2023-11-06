import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaAdopcionPage } from './nueva-adopcion.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaAdopcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaAdopcionPageRoutingModule {}
