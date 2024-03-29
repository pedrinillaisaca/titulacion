import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/componentes/googlemaps/googlemaps.component';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { ApigeodecoderService } from 'src/app/services/apigeodecoder.service';
import { FotoService } from 'src/app/services/foto.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';

@Component({
  selector: 'app-register-waterboard',
  templateUrl: './register-waterboard.page.html',
  styleUrls: ['./register-waterboard.page.scss'],
})
export class RegisterWaterboardPage implements OnInit {
  studentForm: FormGroup
  waterboard:WaterBoard= new WaterBoard();  
  loading: any;
  estadoW:boolean=true
  constructor(
    public servWaterdb:ServWaterboardDbService,  
    public notifi:NotificacionesService,
    private router:Router,
    private svrPhoto:FotoService,
    public loadingController:LoadingController,
    public menucontroler: MenuController,             
    private modalController: ModalController,
    private servApiGeoDeco:ApigeodecoderService,
    private fb: FormBuilder
   ) {      }

  ngOnInit() {
    this.studentForm=this.fb.group({
      nombreEscuela:[''],
      infoStudent:this.fb.array([this.studentInfo()])
    });
  }
  

  async regWaterBoard(){
    this.presentLoading();
    await this.savedPhotos();          
    this.waterboard.estado=this.estadoW;
    this.getResponzablesObj();
    this.servWaterdb.saveWaterBoard(this.waterboard)
    this.loading.dismiss();
    this.notifi.notificacionToast("Guardado Correctamente")

  }

  getResponzablesObj(){    
    var aryy=this.studentForm.getRawValue().infoStudent
    let listaResponsables=[]
    
    for (const property in aryy) {      
      listaResponsables.push(aryy[property].nombreresponzable)
      // console.log(`${property}: ${array[property]}`);
      // index=`${property}`
    }        
    this.waterboard.responzables=listaResponsables;
    console.log(this.waterboard.responzables);
    
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
      this.waterboard.ubicacion = data.pos;
      console.log('UBICACION -> ', this.waterboard.ubicacion);
      // this.waterboard.provincia=this.servApiGeoDeco.getGeoDecoder(this.waterboard.ubicacion.lat,this.waterboard.ubicacion.lng)
      this.obtenerProvincia();
    }

  }

  async obtenerProvincia(){
    try {          
      const prov=await this.servApiGeoDeco.getGeoDecoder(this.waterboard.ubicacion.lat,this.waterboard.ubicacion.lng)
      const array=prov.results
      var index=0
      for (const property in array) {
        index=parseInt(property);
        // console.log(`${property}: ${array[property]}`);
        // index=`${property}`
      }
      // console.log(array[index-1].formatted_address.split(',')[0])
      var provin=array[index-1].formatted_address.split(',')[0];
      
      // console.log(provin)
      if(provin.split(' ').length == 3 ){
        var pr1=provin.split(' ');
        this.waterboard.provincia=pr1[pr1.length-1];
        // console.log(pr1[pr1.length-1])
      }else{
        this.waterboard.provincia= provin;
        // console.log(provin)

      }

    } catch (error) {
      console.log(`Error: =======> ${error}`);
    }
  }

change(e){
  if(this.estadoW == false && this.estadoW == false){
    e.checked = true;
  }
}


studentInfo(){
  return this.fb.group({    
    nombreresponzable:['']
  });
}

getStudentInfo(): FormArray{
  return this.studentForm.get('infoStudent') as FormArray;
}

addStudent(){
  this.getStudentInfo().push(this.studentInfo());
}

removeStudent(index){
  this.getStudentInfo().removeAt(index);
}





}

