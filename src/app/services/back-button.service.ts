import { Injectable } from '@angular/core';
import { Location } from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  constructor(
    private location:Location
    ) {     
  }

  backApp(){
    this.location.back();
  }
}
