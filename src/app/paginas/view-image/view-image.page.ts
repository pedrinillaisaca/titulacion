import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServWaterboardDbService } from '../../services/serv-waterboard-db.service';
import { WaterBoard } from '../../modelo/WaterBoard';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.page.html',
  styleUrls: ['./view-image.page.scss'],
})
export class ViewImagePage implements OnInit {
  @ViewChild('mySlider')  slides: IonSlides;

  waterboard:WaterBoard=new WaterBoard();//incializamos el objeto
  waterboardA:any;
  uidWater:string='CgeLjhplzuTykLpe2BuF'
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private servWater: ServWaterboardDbService
  ) 
  {

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
    console.log(this.waterboardA);
  }

  swipeNext(){
    this.slides.slideNext();
  }
  swipePrev(){    
    this.slides.slidePrev();
  }
  
  // funtion(){
  //   var pswpElement = document.querySelectorAll('.pswp')[0];

  //   // build items array
  //   var items = [
  //       {
  //           src: 'https://placekitten.com/600/400',
  //           w: 600,
  //           h: 400
  //       },
  //       {
  //           src: 'https://placekitten.com/1200/900',
  //           w: 1200,
  //           h: 900
  //       }
  //   ];

  //   // define options (if needed)
  //   var options = {
  //       // optionName: 'option value'
  //       // for example:
  //       index: 0 // start at first slide
  //   };

  //   // Initializes and opens PhotoSwipe
  //   var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  //   gallery.init();
        
  // }
}
