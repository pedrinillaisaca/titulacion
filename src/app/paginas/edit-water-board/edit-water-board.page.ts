import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServWaterboardDbService } from '../../services/serv-waterboard-db.service';
import { WaterBoard } from '../../modelo/WaterBoard';
import { NotificacionesService } from '../../services/notificaciones.service';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { ApigeodecoderService } from '../../services/apigeodecoder.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { GooglemapsComponent } from '../../componentes/googlemaps/googlemaps.component';
import { PhotoService } from '../../services/photo.service';


@Component({
  selector: 'app-edit-water-board',
  templateUrl: './edit-water-board.page.html',
  styleUrls: ['./edit-water-board.page.scss'],
})

export class EditWaterBoardPage implements OnInit {
  nombreresponzable:[''];
  studentForm: FormGroup
  estadoW:boolean=true
  loading: any;
  uidWater:string
  waterboard:WaterBoard= new WaterBoard();
  waterboardA:any;
  constructor(
    private router:Router,
    private route:ActivatedRoute,  
    private serWaterDB:ServWaterboardDbService,

    public servWaterdb:ServWaterboardDbService,  
    public notifi:NotificacionesService,
    
    private svrPhoto:PhotoService,
    public loadingController:LoadingController,
    public menucontroler: MenuController,             
    private modalController: ModalController,
  
    private servApiGeoDeco:ApigeodecoderService,
    private fb: FormBuilder,    

  ) { 

    this.route.queryParams.subscribe(params=>{
      try {
        if(this.router.getCurrentNavigation().extras.queryParams){
        let param=this.router.getCurrentNavigation().extras.queryParams.uidParam;        
        this.uidWater=this.router.getCurrentNavigation().extras.queryParams.infUser;         
        this.uidWater=param;       

      }
      } catch (error) {
        console.log("Error al enivar");
      }
                  
    }); 

  }

  ngOnInit() {               
    this.studentForm=this.fb.group({
      nombreEscuela:[''],
      infoStudent:this.fb.array([this.studentInfo()])
    }); 
    this.loadPageData();
  }

  async loadPageData(){
    this.waterboardA= await this.serWaterDB.getWaterBoardById(this.uidWater);
    this.waterboard=this.waterboardA
    this.estadoW=this.waterboard.estado;
    this.llenarResponzables();
    console.log(this.waterboard);
  }
  
  async regWaterBoard(){    
    if (this.svrPhoto.photos.length == 0) {
      this.notifi.notiErrorConTiempo("Por favor tomar fotografías a la junta", 3000);
    } else {
      this.presentLoading();
      var fotos=await this.svrPhoto.savedFirestorage()
      this.cargarFotos(fotos);
      this.waterboard.fotos_paths.push();
      this.loading.dismiss();
      this.waterboard.estado = this.estadoW;
      this.getResponzablesObj();
      this.servWaterdb.saveWaterBoard(this.waterboard);
      this.svrPhoto.clearStorage();
      this.waterboard=new WaterBoard();
      this.router.navigate(['/search-waterboard']);
      this.notifi.notificacionToast("Guardado Correctamente")
    }
    // this.presentLoading();      
    // this.waterboard.fotos_paths= await this.svrPhoto.savedFirestorage();    
    // this.loading.dismiss();
    // this.waterboard.estado=this.estadoW;
    // this.getResponzablesObj();
    // this.servWaterdb.saveWaterBoard(this.waterboard)    
    // this.svrPhoto.clearStorage();
    // this.notifi.notificacionToast("Guardado Correctamente")
    // this.waterboard=new WaterBoard();
  }

  cargarFotos(fotos){
    for (const key in fotos) {
      this.waterboard.fotos_paths.push(fotos[key])
    }
  }
  
    
  addPhotos(){
    this.router.navigate(['/galery-present']); 
  }
  
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
  

  getResponzablesObj() {
    var aryy = this.studentForm.getRawValue().infoStudent
    let listaResponsables:string[]=[]
    
    for (const property in aryy) {
      var res=''
      res+=aryy[property].nombre;//esto hay qu
      res+=" "
      res+=aryy[property].apellido;
      listaResponsables.push(res); 
      this.removeStudent(property);
    }
    this.waterboard.listaResponsables = listaResponsables;
    console.log(this.waterboard.listaResponsables);

  }


  
  change(e){
    if(this.estadoW == false && this.estadoW == false){
      e.checked = true;
    }
  }
  


  studentInfo() {
    return this.fb.group({
      nombre: [''],
      apellido: ['']
    });
  }

getStudentInfo(): FormArray{  
  return this.studentForm.get('infoStudent') as FormArray
}

addStudent(){
  this.getStudentInfo().push(this.studentInfo());
}

llenarResponzables(){ 
  this.getStudentInfo().removeAt(0);
  for (const key in this.waterboard.listaResponsables) {    
    this.getStudentInfo().push(this.fb.group({nombre:[this.waterboard.listaResponsables[key].split(" ")[0]],apellido:[this.waterboard.listaResponsables[key].split(" ")[1]]}));        
    // this.getStudentInfo().push(this.fb.group({}));        
  }
  
}

removeStudent(index){
  this.getStudentInfo().removeAt(index);
}



}
