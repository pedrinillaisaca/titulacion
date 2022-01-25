import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDataWaterBoardPage } from './view-data-water-board.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDataWaterBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDataWaterBoardPageRoutingModule {}
