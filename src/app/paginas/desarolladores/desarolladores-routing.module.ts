import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesarolladoresPage } from './desarolladores.page';

const routes: Routes = [
  {
    path: '',
    component: DesarolladoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesarolladoresPageRoutingModule {}
