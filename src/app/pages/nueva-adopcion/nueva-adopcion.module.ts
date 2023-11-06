import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaAdopcionPageRoutingModule } from './nueva-adopcion-routing.module';

import { NuevaAdopcionPage } from './nueva-adopcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaAdopcionPageRoutingModule
  ],
  declarations: [NuevaAdopcionPage]
})
export class NuevaAdopcionPageModule {}
