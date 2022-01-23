import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAllWaterboardPage } from './view-all-waterboard.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAllWaterboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllWaterboardPageRoutingModule {}
