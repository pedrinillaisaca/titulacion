import { Component, OnInit } from '@angular/core';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';
import {  NavigationExtras, Router } from '@angular/router';


interface Provincia{
  id: number;
  label: string;
  value: string;
}

@Component({
  selector: 'app-search-waterboard',
  templateUrl: './search-waterboard.page.html',
  styleUrls: ['./search-waterboard.page.scss'],
})

export class SearchWaterboardPage implements OnInit {

  filterPost = '';
 
  filterWater = '';
  // juntas: WaterBoard[] = [];
  
  
  juntas: WaterBoard[] = [];    
  juntas1 = [];
  seleccionadoProv:string='';
  // juntas1: Observable<WaterBoard[]>;
  

  
  constructor(
    private servWater: ServWaterboardDbService,
    private router:Router
  ) {

   }

  ngOnInit() {
    this.servWater.getWaterBoards().subscribe(juntaOne => {
      this.juntas = juntaOne as WaterBoard[];
      this.juntas1 = this.juntas;      
      console.log(this.juntas1)
    });  
    console.log(this.juntas1)
    

    // this.juntas1=this.servWater.getWaterBoards();
    
  }

  viewInforWater(param) {    
    let params: NavigationExtras={
      queryParams:{
        uid: param
      }
    }          
    this.router.navigate(["/view-data-water-board"],params);          
  }

  

  

}
