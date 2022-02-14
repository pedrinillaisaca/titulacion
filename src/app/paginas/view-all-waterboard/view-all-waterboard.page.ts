import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AppLauncherOptions, AppLauncher } from '@ionic-native/app-launcher/ngx';
import { BackButtonService } from '../../services/back-button.service';

interface Ubicacion {
    lat: number;
    lng: number;  
}

@Component({
  selector: 'app-view-all-waterboard',
  templateUrl: './view-all-waterboard.page.html',
  styleUrls: ['./view-all-waterboard.page.scss'],
})
export class ViewAllWaterboardPage implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  marcador:Ubicacion;

  center: google.maps.LatLngLiteral;

  
  constructor(    
    private route:ActivatedRoute,
    private router:Router,
    private appLauncher: AppLauncher,
    private button:BackButtonService
    
  ) {    
    this.route.queryParams.subscribe(params=>{
      try {
        if(this.router.getCurrentNavigation().extras.queryParams){
          let param=this.router.getCurrentNavigation().extras.queryParams.ubicationParam;        
          // this.uidWater=this.router.getCurrentNavigation().extras.queryParams.infUser; 
          this.marcador=param;            
        }
      } catch (error) {
        console.log("Es mi primera vez");
      }
      
    });   
  }
  
  ngOnInit() { 
    this.runAsc();         
    // this.juntas.forEach(
    //     function(value){
    //       console.log((value.            ));    
    //       // this.juntass.unshift(value);
    //     }
    //   );
    
  }
    
  // load(){
  //   const juntas= this.waterBdb.getWaterBoards();     
  //   console.log('1 juntas==>'+juntas); 
  //   juntas.forEach(
  //   function(value){
  //     console.log((value));  
  //     this.juntas.unshift(value);
  //     // this.juntass.unshift(value);
  //     }
  //   );                  
  // }

  async testAsync(){
    return new Promise<void>((resolve,reject)=>{
        //here our function should be implemented 
        setTimeout(()=>{
            console.log("Durante");
            resolve();
        ;} , 1500
        );
    });
  }

  async callerFun(){
    console.log("Antes");
    await this.testAsync();
    console.log("Despues");
    this.map.panTo(this.marcador);
    this.map.zoom=-100

  }

  runAsc(){
    this.callerFun();
  }
  runMap(){         
    const options: AppLauncherOptions = {
    }         
    options.uri='google.navigation:q='+this.marcador.lat+','+this.marcador.lng+'&mode=1';//ESTA LINEA ES MUY IMPORTANTE !!!!!!!
    options.packageName = 'com.google.android.apps.maps';
    //console.log("INFORMACIONS DE LAS OPCIONES ",options)
    this.appLauncher.canLaunch(options)//canLaunch(options)
      .then((canLaunch: boolean) => {
        this.appLauncher.launch(options);       
      })
      .catch((error: any) => {console.log("Error desconicido")}      
      );           
  }
  
}

