import { Component, OnInit } from '@angular/core';
import { FotoService } from 'src/app/services/foto.service';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.page.html',
  styleUrls: ['./galery.page.scss'],
})
export class GaleryPage implements OnInit {

  constructor(public servFoto:FotoService) { }

  async ngOnInit() {
    // await this.servFoto.loadSaved();
  }

  addPhotoGalery(){
    this.servFoto.addNewToGalery()
  }

  savedFire(){
    this.servFoto.savedFirestorage()
  }

}
