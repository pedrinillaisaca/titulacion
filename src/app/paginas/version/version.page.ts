import { Component, OnInit } from '@angular/core';
import { BackButtonService } from '../../services/back-button.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.page.html',
  styleUrls: ['./version.page.scss'],
})
export class VersionPage implements OnInit {

  constructor(
    private servBac:BackButtonService
  ) { }

  ngOnInit() {
  }

  openDoc(){
    window.open('https://firebasestorage.googleapis.com/v0/b/pruebatesis13.appspot.com/o/docs%2FManualUsuario.pdf?alt=media&token=279a647d-a714-4c66-81fb-341ecc37a440','_system')
  }

}
