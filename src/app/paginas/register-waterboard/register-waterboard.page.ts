import { Component, OnInit } from '@angular/core';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';

@Component({
  selector: 'app-register-waterboard',
  templateUrl: './register-waterboard.page.html',
  styleUrls: ['./register-waterboard.page.scss'],
})
export class RegisterWaterboardPage implements OnInit {

  constructor(
    public servWaterdb:ServWaterboardDbService,
    public notifi:NotificacionesService
   ) { }
  waterboard:WaterBoard=new WaterBoard();//incializamos el objeto

  ngOnInit() {
  }

  regWaterBoard(){
    console.log(this.waterboard);    
    this.servWaterdb.saveWaterBoard(this.waterboard)
    this.notifi.notificacionToast("Guardado Correctamente")
  }

}
