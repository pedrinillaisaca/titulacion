import { Component } from '@angular/core';
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
    { title: 'Registro', url: '/register-waterboard', icon: 'paper-plane' },
    { title: 'Ver juntas Agua', url: '/view-all-waterboard', icon: 'heart' },
    { title: 'Buscar Juntas', url: '/search-waterboard', icon: 'water' },
    { title: 'Archived', url: '/view-data-water-board', icon: 'archive' },    
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = [];
  constructor() {}

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  
  
}
