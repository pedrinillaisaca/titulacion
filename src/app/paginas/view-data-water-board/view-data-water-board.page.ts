import { Component, OnInit } from '@angular/core';
import { WaterBoard } from 'src/app/modelo/WaterBoard';

@Component({
  selector: 'app-view-data-water-board',
  templateUrl: './view-data-water-board.page.html',
  styleUrls: ['./view-data-water-board.page.scss'],
})
export class ViewDataWaterBoardPage implements OnInit {

  button_bool:boolean=true;
  waterboard:WaterBoard=new WaterBoard();//incializamos el objeto
  constructor() { }

  ngOnInit() {
  }

  funcionEnable(){
    this.button_bool=!this.button_bool;
  }

  editWaterBoard(){

  }

}
