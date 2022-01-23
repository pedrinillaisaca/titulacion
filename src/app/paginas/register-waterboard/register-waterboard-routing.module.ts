import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterWaterboardPage } from './register-waterboard.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterWaterboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterWaterboardPageRoutingModule {}
