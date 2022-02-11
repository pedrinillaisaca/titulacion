import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditWaterBoardPageRoutingModule } from './edit-water-board-routing.module';

import { EditWaterBoardPage } from './edit-water-board.page';

@NgModule({
  imports: [
    CommonModule,    
    IonicModule,
    EditWaterBoardPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EditWaterBoardPage]
})
export class EditWaterBoardPageModule {}
