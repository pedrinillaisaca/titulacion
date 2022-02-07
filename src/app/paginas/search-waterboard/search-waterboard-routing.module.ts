import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchWaterboardPage } from './search-waterboard.page';

const routes: Routes = [
  {
    path: '',
    component: SearchWaterboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchWaterboardPageRoutingModule {}
