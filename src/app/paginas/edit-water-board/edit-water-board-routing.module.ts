import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditWaterBoardPage } from './edit-water-board.page';

const routes: Routes = [
  {
    path: '',
    component: EditWaterBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditWaterBoardPageRoutingModule {}
