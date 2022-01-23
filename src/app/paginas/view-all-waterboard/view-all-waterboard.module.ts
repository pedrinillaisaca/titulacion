import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAllWaterboardPageRoutingModule } from './view-all-waterboard-routing.module';

import { ViewAllWaterboardPage } from './view-all-waterboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAllWaterboardPageRoutingModule
  ],
  declarations: [ViewAllWaterboardPage]
})
export class ViewAllWaterboardPageModule {}
