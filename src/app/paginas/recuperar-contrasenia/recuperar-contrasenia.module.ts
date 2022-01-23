import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarContraseniaPageRoutingModule } from './recuperar-contrasenia-routing.module';

import { RecuperarContraseniaPage } from './recuperar-contrasenia.page';
import { RecuperarContraseniaPipe } from '../recuperar-contrasenia.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContraseniaPageRoutingModule
  ],
  declarations: [RecuperarContraseniaPage, RecuperarContraseniaPipe]
})
export class RecuperarContraseniaPageModule {}
