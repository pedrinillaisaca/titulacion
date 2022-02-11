import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PagPruebaPageRoutingModule } from './pag-prueba-routing.module';

import { PagPruebaPage } from './pag-prueba.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,    
    IonicModule,
    PagPruebaPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PagPruebaPage]
})
export class PagPruebaPageModule {}
