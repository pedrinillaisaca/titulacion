import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { User } from './shared/user.interface';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //paginas barra lateral
  user$: Observable<User>= this.authSvc.afAuth.user;
  public selectedIndex = 0;
  public appPages = [
    // { title: 'Login', url: '/login', icon: 'mail',hiden: false },
    { title: 'Buscar Juntas', url: '/search-waterboard', icon: 'water' ,hiden: true},
    { title: 'Registro', url: '/register-waterboard', icon: 'attach' ,hiden: true},
    // { title: 'Prueba pagina', url: '/pag-prueba', icon: 'archive' },    
    // { title: 'Galeria antigua', url: '/galery', icon: 'heart' },
    // { title: 'galetia', url: '/galery-present', icon: 'heart' },
    // { title: 'informacion de la junta', url: '/view-data-water-board', icon: 'heart' },
  ];

  public labels = [
    { title: 'Cerrar Sesion', url: '/login', icon: 'exit' , hiden: false},
    { title: 'Nosotros', url: '/nosotros', icon: 'business' , hiden: true},
    { title: 'Desarrolladores', url: '/desarolladores', icon: 'build' , hiden: true},
    { title: 'Ayuda', url: '/version', icon: 'help' , hiden: true}  
  ];
   
  
  constructor( 
    private authSvc:AuthService,    
  ) {



  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    console.log(this.user$._isScalar);
  }


  logout(){
    console.log('salir')
    this.authSvc.logout();
  } 
  
  
}
