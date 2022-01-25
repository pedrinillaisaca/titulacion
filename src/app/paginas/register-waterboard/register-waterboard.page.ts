import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { FotoService } from 'src/app/services/foto.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';

@Component({
  selector: 'app-register-waterboard',
  templateUrl: './register-waterboard.page.html',
  styleUrls: ['./register-waterboard.page.scss'],
})
export class RegisterWaterboardPage implements OnInit {

  waterboard:WaterBoard=new WaterBoard();//incializamos el objeto
  constructor(
    public servWaterdb:ServWaterboardDbService,  
    public notifi:NotificacionesService,
    private router:Router,
    private svrPhoto:FotoService
   ) { }

  ngOnInit() {

  }
  

  regWaterBoard(){
    this.savedPhotos();
    this.waterboard.fotos_paths=this.svrPhoto.fotos_paths;
    console.log(this.waterboard);    
    this.servWaterdb.saveWaterBoard(this.waterboard)
    this.notifi.notificacionToast("Guardado Correctamente")
  }

  savedPhotos(){
   this.svrPhoto.savedFirestorage();
  }


  addPhotos(){
    this.router.navigate(['/galery']); 
  }

  ngOnDestroy():void{
    console.log('DEstroy')
    this.svrPhoto.clearStorage()
  }

}
