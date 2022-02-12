import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleryPresentPageRoutingModule } from './galery-present-routing.module';

import { GaleryPresentPage } from './galery-present.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleryPresentPageRoutingModule
  ],
  declarations: [GaleryPresentPage]
})
export class GaleryPresentPageModule {}
