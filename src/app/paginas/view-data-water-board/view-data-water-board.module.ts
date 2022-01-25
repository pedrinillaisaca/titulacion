import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDataWaterBoardPageRoutingModule } from './view-data-water-board-routing.module';

import { ViewDataWaterBoardPage } from './view-data-water-board.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDataWaterBoardPageRoutingModule
  ],
  declarations: [ViewDataWaterBoardPage]
})
export class ViewDataWaterBoardPageModule {}
