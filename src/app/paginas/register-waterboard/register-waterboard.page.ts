import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/componentes/googlemaps/googlemaps.component';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { ApigeodecoderService } from 'src/app/services/apigeodecoder.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';
import { PhotoService } from '../../services/photo.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/user.interface';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register-waterboard',
  templateUrl: './register-waterboard.page.html',
  styleUrls: ['./register-waterboard.page.scss'],
})
export class RegisterWaterboardPage implements OnInit {
  studentForm: FormGroup
  waterboard: WaterBoard = new WaterBoard();
  loading: any;
  estadoW: boolean = true;
  user$: Observable<User>= this.authSvc.afAuth.user;
  constructor(
    public servWaterdb: ServWaterboardDbService,
    public notifi: NotificacionesService,
    private router: Router,
    private svrPhoto: PhotoService,
    public loadingController: LoadingController,
    public menucontroler: MenuController,
    private modalController: ModalController,
    private servApiGeoDeco: ApigeodecoderService,
    private fb: FormBuilder,
    private authSvc:AuthService
  ) { }

  ngOnInit() {
    this.user$.subscribe(x=>{
      this.waterboard.registradorName=x.displayName;
      this.waterboard.registradorUid=x.uid;
    });
    this.studentForm = this.fb.group({
      nombreEscuela: [''],
      infoStudent: this.fb.array([this.studentInfo()])
    });
  }

  async regWaterBoard() {
    if (this.svrPhoto.photos.length == 0) {
      this.notifi.notiErrorConTiempo("Por favor tomar fotografías a la junta", 3000);
    } else {
      this.presentLoading();
      this.waterboard.fotos_paths = await this.svrPhoto.savedFirestorage();
      this.loading.dismiss();
      this.waterboard.estado = this.estadoW;
      this.getResponzablesObj();
      this.servWaterdb.saveWaterBoard(this.waterboard);
      this.svrPhoto.clearStorage();
      this.notifi.notificacionToast("Guardado Correctamente")
      this.waterboard=new WaterBoard();
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


  addPhotos() {
    this.router.navigate(['/galery-present']);
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

    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,
      componentProps: { position: positionInput }
    });
    await modalAdd.present();

    const { data } = await modalAdd.onWillDismiss();
    if (data) {
      this.waterboard.ubicacion = data.pos;
      console.log('UBICACION -> ', this.waterboard.ubicacion);
      // this.waterboard.provincia=this.servApiGeoDeco.getGeoDecoder(this.waterboard.ubicacion.lat,this.waterboard.ubicacion.lng)
      this.obtenerProvincia();
    }

  }

  async obtenerProvincia() {
    try {
      const prov = await this.servApiGeoDeco.getGeoDecoder(this.waterboard.ubicacion.lat, this.waterboard.ubicacion.lng)
      const array = prov.results
      var index = 0
      for (const property in array) {
        index = parseInt(property);
        // console.log(`${property}: ${array[property]}`);
        // index=`${property}`
      }
      // console.log(array[index-1].formatted_address.split(',')[0])
      var provin = array[index - 1].formatted_address.split(',')[0];

      // console.log(provin)
      if (provin.split(' ').length == 3) {
        var pr1 = provin.split(' ');
        this.waterboard.provincia = pr1[pr1.length - 1];
        // console.log(pr1[pr1.length-1])
      } else {
        this.waterboard.provincia = provin;
        // console.log(provin)

      }

    } catch (error) {
      console.log(`Error: =======> ${error}`);
    }
  }

  change(e) {
    if (this.estadoW == false && this.estadoW == false) {
      e.checked = true;
    }
  }


  studentInfo() {
    return this.fb.group({
      nombre: [''],
      apellido: ['']
    });
  }

  getStudentInfo(): FormArray {
    return this.studentForm.get('infoStudent') as FormArray;
  }

  addStudent() {
    this.getStudentInfo().push(this.studentInfo());
  }

  removeStudent(index) {
    this.getStudentInfo().removeAt(index);
  }





}

