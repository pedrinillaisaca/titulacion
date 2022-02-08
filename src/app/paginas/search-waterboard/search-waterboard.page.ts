import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WaterBoard } from 'src/app/modelo/WaterBoard';
import { ServWaterboardDbService } from 'src/app/services/serv-waterboard-db.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-search-waterboard',
  templateUrl: './search-waterboard.page.html',
  styleUrls: ['./search-waterboard.page.scss'],
})
export class SearchWaterboardPage implements OnInit {

  filterPost = '';
  // posts = [
  //   {
  //     'id': 1,
  //     'title': 'el pepe',
  //     'date': '02/04/2019'
  //   },
  //   {
  //     'id': 2,
  //     'title': 'martha julia',
  //     'date': '11/04/2019'
  //   },
  //   {
  //     'id': 3,
  //     'title': 'ella no te ama',
  //     'date': '30/01/2019'
  //   },
  //   {
  //     'id': 4,
  //     'title': 'perra',
  //     date: '30/05/2019'
  //   },
  //   {
  //     'id': 5,
  //     'title': 'juan jo',
  //     'date': '30/04/2019'
  //   }
  // ];

  filterWater = '';
  juntas: WaterBoard[] = [];
  juntas1 = [];
  // juntas: Observable<WaterBoard[]>;
  
  
  constructor(
    private servWater: ServWaterboardDbService
  ) { }

  ngOnInit() {
    this.servWater.getWaterBoards().subscribe(juntaOne => {
      this.juntas = juntaOne as WaterBoard[];
      this.juntas1 = this.juntas;
    });    
    this.getProv();
  }

  verTipo() {
    console.log(this.juntas.length);
    console.log(this.filterWater.length);
  }

  async subGetProv(myLat,myLon){    
    const response= await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + environment.ApiKeyGoogleMaps, {
      method: 'GET',
      redirect: 'follow'
    });
    if(response.status !==200){
      throw Error("Algo sucede con el api")
    }        
    return response.json()
  }

  async getProv(){
    try {
      const objjson=await this.subGetProv('-2.877165094218574','-79.03816949639268');
      // console.log(objjson['DATA']['general']);      
      console.log(objjson)     
    } catch (error) {
      console.log(`Error: =======> ${error}`);
    }
  }


  



}
