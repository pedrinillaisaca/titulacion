import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchWaterboardPageRoutingModule } from './search-waterboard-routing.module';

import { SearchWaterboardPage } from './search-waterboard.page';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchWaterboardPageRoutingModule,
    PipesModule
  ],
  declarations: [SearchWaterboardPage]
})
export class SearchWaterboardPageModule {}
