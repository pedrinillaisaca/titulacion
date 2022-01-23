import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagGeneralPageRoutingModule } from './pag-general-routing.module';

import { PagGeneralPage } from './pag-general.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagGeneralPageRoutingModule
  ],
  declarations: [PagGeneralPage]
})
export class PagGeneralPageModule {}
