import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleryPresentPage } from './galery-present.page';

const routes: Routes = [
  {
    path: '',
    component: GaleryPresentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleryPresentPageRoutingModule {}
