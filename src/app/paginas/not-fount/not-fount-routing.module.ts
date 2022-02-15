import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFountPage } from './not-fount.page';

const routes: Routes = [
  {
    path: '',
    component: NotFountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFountPageRoutingModule {}
