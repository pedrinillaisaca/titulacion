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

  public backApp(){
    this.location.back();
  }
}
