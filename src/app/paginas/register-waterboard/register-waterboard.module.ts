import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { RegisterWaterboardPageRoutingModule } from './register-waterboard-routing.module';

import { RegisterWaterboardPage } from './register-waterboard.page';

@NgModule({
  imports: [
    CommonModule,    
    IonicModule,
    RegisterWaterboardPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterWaterboardPage]
})
export class RegisterWaterboardPageModule {}
