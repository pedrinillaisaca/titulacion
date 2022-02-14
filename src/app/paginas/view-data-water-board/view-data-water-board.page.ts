import {  Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';

import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { NotificacionesService } from '../../services/notificaciones.service';
import { BackButtonService } from '../../services/back-button.service';


@Component({
  selector: 'app-view-data-water-board',
  templateUrl: './view-data-water-board.page.html',
  styleUrls: ['./view-data-water-board.page.scss'],
})
export class ViewDataWaterBoardPage implements OnInit {

  button_bool:boolean=true;
  waterboard:WaterBoard=new WaterBoard();//incializamos el objeto
  waterboardA:any;
  uidWater:string="";
  pswpElement = document.querySelectorAll('.pswp')[0];


  

  constructor(
    private servWater: ServWaterboardDbService,
    private router:Router,
    private route:ActivatedRoute,  
    private appLauncher: AppLauncher,   
    public notifi:NotificacionesService,
    private servBac:BackButtonService
    ) {  

      this.waterboard.nombre='';
      this.waterboard.provincia='';

      
      this.route.queryParams.subscribe(params=>{
        try {
          if(this.router.getCurrentNavigation().extras.queryParams){
          let param=this.router.getCurrentNavigation().extras.queryParams.uid;        
          // this.uidWater=this.router.getCurrentNavigation().extras.queryParams.infUser; 
          console.log(param);
          this.uidWater=param;       

        }
        } catch (error) {
          console.log("Es mi primera vez");
        }
                    
      });      
  }
    
  
  async ngOnInit() {      
    this.waterboardA= await this.servWater.getWaterBoardById(this.uidWater);
    this.waterboard=this.waterboardA;
    console.log(this.waterboardA) 
      
  }

  runMap(){ 
    
    console.log("PEDRO ILLAISACA");         
    const options: AppLauncherOptions = {
    }         
    options.uri='com.google.android.apps.maps://google.nvigation:q=22.659239,88.435534&mode=1';//ESTA LINEA ES MUY IMPORTANTE !!!!!!!
    options.packageName = 'com.google.android.apps.maps';
    //console.log("INFORMACIONS DE LAS OPCIONES ",options)
    this.appLauncher.canLaunch(options)//canLaunch(options)
      .then((canLaunch: boolean) => {
        this.appLauncher.launch(options);       
      })
      .catch((error: any) => {console.log("Error desconicido")}      
      );           
  }
     

  funcionEnable(){
    this.button_bool=!this.button_bool;
  }

  editWaterBoard(){
    this.servWater.borrarWaterBoard(this.waterboard.uid);
  }

  refirectMapa(ubication){
    console.log(ubication)
    let params: NavigationExtras={
      queryParams:{
        ubicationParam: ubication
      }
    }          
    this.router.navigate(["/view-all-waterboard"],params);          
  }


  
  viewImages(){
    let params: NavigationExtras={
      queryParams:{
        uid: this.uidWater
      }
    }          
    this.router.navigate(["/view-image"],params);   
  }


  deletjunta(){
    this.notifi.confirmacionEliminarJunta("Advertencia"," Se borrará de forma permanente!",this.waterboard.uid);        
  }



  editarJunta(){
    let params: NavigationExtras={
      queryParams:{
        uidParam: this.waterboard.uid
      }
    }          
    this.router.navigate(["/edit-water-board"],params);         

  }
  

}
