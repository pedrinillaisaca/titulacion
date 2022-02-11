import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApigeodecoderService {

  constructor() { }

  async getGeoDecoder(myLat,myLon){    
    const response= await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + environment.ApiKeyGoogleMaps, {
      method: 'GET',
      redirect: 'follow'
    });
    if(response.status !==200){
      throw Error("Algo sucede con el api")
    }        
    return response.json()
  }
  // ESTO SOLO ES PARA UNA REVISION 
  async getGeoDecoderPrimer(myLat,myLon){
    try {
      const objjson=await this.getGeoDecoder(myLat,myLon);
      // console.log(objjson['DATA']['general']);      
      return objjson      
    } catch (error) {
      console.log(`Error: =======> ${error}`);
    }
  }
}
