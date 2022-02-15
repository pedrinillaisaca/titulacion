import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFountPageRoutingModule } from './not-fount-routing.module';

import { NotFountPage } from './not-fount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFountPageRoutingModule
  ],
  declarations: [NotFountPage]
})
export class NotFountPageModule {}
