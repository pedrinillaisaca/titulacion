import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FotoService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.page.html',
  styleUrls: ['./galery.page.scss'],
})
export class GaleryPage implements OnInit {

  constructor(
    public servFoto:FotoService,
    private router:Router
    ) { }

  async ngOnInit() {
    await this.servFoto.loadSaved();
  }

  addPhotoGalery(){
    this.servFoto.addNewToGalery()
  }

  savedFire(){//solo para prueba 
    this.servFoto.savedFirestorage()
  }

  gotoRegisterWB(){
    this.router.navigate(['/register-waterboard']);
  }

}
