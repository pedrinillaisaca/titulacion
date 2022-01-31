import { AfterViewInit, Component, OnInit } from '@angular/core';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';

@Component({
  selector: 'app-view-data-water-board',
  templateUrl: './view-data-water-board.page.html',
  styleUrls: ['./view-data-water-board.page.scss'],
})
export class ViewDataWaterBoardPage implements OnInit {

  button_bool:boolean=true;
  waterboard:WaterBoard=new WaterBoard();//incializamos el objeto
  waterboardA:any;
  uidWater:string="zMVpBo6VoBI3xNJSnhvS";

  constructor(private servWater:ServWaterboardDbService) {     
  }
  
  
  
  async ngOnInit() {      
    this.waterboardA= await this.servWater.getWaterBoardById(this.uidWater);
    console.log(this.waterboardA.nombre)    
    this.waterboard=this.waterboardA;
  }
  
  

  funcionEnable(){
    this.button_bool=!this.button_bool;
  }

  editWaterBoard(){

  }

}
