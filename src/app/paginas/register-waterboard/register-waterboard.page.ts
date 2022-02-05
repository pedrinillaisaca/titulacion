import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/componentes/googlemaps/googlemaps.component';
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
  loading: any;
  constructor(
    public servWaterdb:ServWaterboardDbService,  
    public notifi:NotificacionesService,
    private router:Router,
    private svrPhoto:FotoService,
    public loadingController:LoadingController,

    public menucontroler: MenuController,             
    private modalController: ModalController
   ) { }

  ngOnInit() {

  }
  

  async regWaterBoard(){
    this.presentLoading();
    await this.savedPhotos();    
    console.log(this.waterboard);    
    this.servWaterdb.saveWaterBoard(this.waterboard)
    this.notifi.notificacionToast("Guardado Correctamente")
    this.loading.dismiss();
  }

  async savedPhotos(){
    this.waterboard.fotos_paths= await this.svrPhoto.savedFirestorage();
  }


  addPhotos(){
    this.router.navigate(['/galery']); 
  }

  // ngOnDestroy():void{
  //   console.log('DEstroy')
  //   this.svrPhoto.clearStorage()
  // }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando...',
    });
    await this.loading.present();
  }

  async addDirection() {

    const ubicacion = this.waterboard.ubicacion;
    let positionInput = {  
      lat: 0,
      lng: 0,
    };
    if (ubicacion !== null) {
        positionInput = ubicacion; 
    }

    const modalAdd  = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: {position: positionInput}
    });
    await modalAdd.present();

    const {data} = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data -> ', data);
      this.waterboard.ubicacion = data.pos;
      console.log('this.cliente -> ', this.waterboard);
    }

  }




}
