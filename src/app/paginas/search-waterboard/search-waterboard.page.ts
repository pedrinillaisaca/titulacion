import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';

@Component({
  selector: 'app-search-waterboard',
  templateUrl: './search-waterboard.page.html',
  styleUrls: ['./search-waterboard.page.scss'],
})
export class SearchWaterboardPage implements OnInit {

  filterPost = '';
  posts = [
    {
      "id": 1,
      "title": "el pepe",
      "date": "02/04/2019"
    },
    {
      "id": 2,
      "title": "martha julia",
      "date": "11/04/2019"
    },
    {
      "id": 3,
      "title": "ella no te ama",
      "date": "30/01/2019"
    },
    {
      "id": 4,
      "title": "perra",
      "date": "30/05/2019"
    },
    {
      "id": 5,
      "title": "juan jo",
      "date": "30/04/2019"
    }
  ];

  filterWater = '';  
  juntas:WaterBoard[]=[];  
  juntas1=[];
  // juntas: Observable<WaterBoard[]>;

  constructor(
    private servWater:ServWaterboardDbService
    ) { }

   ngOnInit() {    
    this.servWater.getWaterBoards().subscribe(juntaOne=>{
      this.juntas = juntaOne as WaterBoard[]
      this.juntas1=this.juntas;
    });
    // this.juntas=this.servWater.getWaterBoards();
    
  }

  verTipo(){
    console.log(this.juntas.length)    
    console.log(this.filterWater.length)    
  }


}
