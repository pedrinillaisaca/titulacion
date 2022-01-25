import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { GeoRefWBoard } from '../modelo/GeoRefWBoard';

@Injectable({
  providedIn: 'root'
})
export class ServGeoWBoardDbService {

  constructor(public afs:AngularFirestore) { }
   // guardamos en la base de datos un registro 
   async saveGeoRefWBoard(geoRefWBoard:GeoRefWBoard){
    const refgeoRefWBoard= this.afs.collection("geoRefWBoard");//referencia a la tabla de la base de datos
    if(geoRefWBoard.uid==null)
    geoRefWBoard.uid=this.afs.createId();
    refgeoRefWBoard.doc(geoRefWBoard.uid).set(Object.assign({},geoRefWBoard),{merge:true})
  }
  // retorna una lista de las juntas de agua las cuales no tengan un eliminado logico
  getGeoRefWBoard(): Observable<any[]> {
    return this.afs.collection("geoRefWBoard",ref => ref.where('deleted', '==', false)).valueChanges();  
  }
  // retorna determinada junta en funcion al uid de la misma
  async getGeoRefWBoardById(uid: string){
    try{
        let aux = await this.afs.collection("geoRefWBoard", 
            ref => ref.where('uid', '==', uid))
                      .valueChanges().pipe(first()).toPromise().then(doc => {                    	  
                          return doc;
                      }).catch(error => {
                          throw error;
                      });
        if(aux==null)
            return {};
        return aux[0];
    }catch(error){
      console.error("Error get waterboard ById", error);
      throw error;
    } 
  }
  //segunda manera de obtener una determinada junta
  getGeoRefWBoardById2(uid: string) :Observable<any>{
    console.log("ACTIVE SERVICIO");
    return this.afs.collection("geoRefWBoard", ref => ref.where('uid', '==', uid)).valueChanges();
  }
  //Eliminar junta 
  // async borrarWaterBoard(uid: string){
  //   console.log("fun Eminar OK: ", uid);
  //   const refWaterB = this.afs.collection("waterboard");    
  //   const aux = {deleted: true};
  //   refWaterB.doc(uid).set( {...aux}, { merge: true})
  // } 
}
