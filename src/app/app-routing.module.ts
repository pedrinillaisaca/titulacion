import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsLoginGuard } from './guards/is-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'folder/:pag-general',
    loadChildren: () => import('./paginas/pag-general/pag-general.module').then( m => m.PagGeneralPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar-contrasenia',
    loadChildren: () => import('./paginas/recuperar-contrasenia/recuperar-contrasenia.module').then( m => m.RecuperarContraseniaPageModule)
  },
  {
    path: 'msj-confirm',
    loadChildren: () => import('./paginas/msj-confirm/msj-confirm.module').then( m => m.MsjConfirmPageModule)
  },
  {
    path: 'view-all-waterboard',
    loadChildren: () => import('./paginas/view-all-waterboard/view-all-waterboard.module').then( m => m.ViewAllWaterboardPageModule),
    canActivate:[IsLoginGuard]
  },
  {
    path: 'register-waterboard',
    loadChildren: () => import('./paginas/register-waterboard/register-waterboard.module').then( m => m.RegisterWaterboardPageModule),
    canActivate:[IsLoginGuard]
  },
  {
    path: 'galery',
    loadChildren: () => import('./paginas/galery/galery.module').then( m => m.GaleryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
