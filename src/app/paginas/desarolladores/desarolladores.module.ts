import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesarolladoresPageRoutingModule } from './desarolladores-routing.module';

import { DesarolladoresPage } from './desarolladores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesarolladoresPageRoutingModule
  ],
  declarations: [DesarolladoresPage]
})
export class DesarolladoresPageModule {}
