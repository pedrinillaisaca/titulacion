import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterWaterboardPageRoutingModule } from './register-waterboard-routing.module';

import { RegisterWaterboardPage } from './register-waterboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterWaterboardPageRoutingModule
  ],
  declarations: [RegisterWaterboardPage]
})
export class RegisterWaterboardPageModule {}
