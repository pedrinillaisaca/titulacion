import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { IonSlides } from '@ionic/angular';
import { Observable } from 'rxjs';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';

interface MyPoint {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  image: string;
  text: string;
}

@Component({
  selector: 'app-view-all-waterboard',
  templateUrl: './view-all-waterboard.page.html',
  styleUrls: ['./view-all-waterboard.page.scss'],
})
export class ViewAllWaterboardPage implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  

  center: google.maps.LatLngLiteral;

  points: MyPoint[] = [
    {
      position: {
        lat: -17.386378,
        lng: -66.1628018,
      },
      title: 'Parque De la Familia',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipOCgzq_0DYB9AxD-ItTG01x2csLsSfWsawBCypc=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
    {
      position: {
        lat: -17.4005556,
        lng: -66.1741667,
      },

      title: 'Mariscal Santa Cruz',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipMGZeu88O8uZvFOX9PKug7gz-VRhhiXQ78hAFZU=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
    {
      position: {
        lat: -17.3810618,
        lng: -66.1550974,
      },
      title: 'Parque de Educación Vial',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipPIXxrXfshAD6eHbkGScPdNqYBwfJ6ol4qriq2n=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
    {
      position: {
        lat: -17.4128145,
        lng: -66.158299,
      },
      title: 'Parque Kanata',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipOJOq3vm1Gfpa3d4dPR_ca2C240J_PBv701zRAE=w408-h544-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
  ];

  // waterboard:WaterBoard=new WaterBoard();
  juntass : WaterBoard []=[];
  juntas:Observable<any[]>;
  
  constructor(
    private waterBdb: ServWaterboardDbService
  ) {}


  ngOnInit():void {  
    this.load();
    
    // this.juntas.forEach(
    //     function(value){
    //       console.log((value.            ));    
    //       // this.juntass.unshift(value);
    //     }
    //   );
  }

  load(){
    const juntas= this.waterBdb.getWaterBoards();     
    console.log('1 juntas==>'+juntas); 
    juntas.forEach(
    function(value){
      console.log((value));  
      this.juntas.unshift(value);
      // this.juntass.unshift(value);
      }
    );                  
  }



  async onSlideDidChange() {  
    console.log("USO onSlideDidChange");
    const currentSlide = await this.slides.getActiveIndex();
    const point = this.points[currentSlide];
    this.map.panTo(point.position);
  }
  
}

