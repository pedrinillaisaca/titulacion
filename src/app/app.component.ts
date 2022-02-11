import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //paginas barra lateral
  public selectedIndex = 0;
  public appPages = [
    { title: 'Login', url: '/login', icon: 'mail' },
    { title: 'Registro', url: '/register-waterboard', icon: 'attach' },
    { title: 'Buscar Juntas', url: '/search-waterboard', icon: 'water' },
    // { title: 'Prueba pagina', url: '/pag-prueba', icon: 'archive' },    
    // { title: 'informacion de la junta', url: '/view-all-waterboard', icon: 'heart' },
    // { title: 'informacion de la junta', url: '/view-data-water-board', icon: 'heart' },
    { title: 'informacion de la junta', url: '/view-data-water-board', icon: 'heart' },
  ];
  public labels = ['Cerrar Sesion'];
  constructor( 
    private autenServ:AuthService
  ) {}

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }


  logout(){
    console.log('salir')
    this.autenServ.logout();
  } 
  
  
}
