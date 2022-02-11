import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { WaterBoard } from '../modelo/WaterBoard';

@Injectable({
  providedIn: 'root'
})
export class ServWaterboardDbService {

  constructor( public afs:AngularFirestore ) { }

  // guardamos en la base de datos un registro 
  async saveWaterBoard(waterboard:WaterBoard){
    const refUsuario= this.afs.collection("waterboard");//referencia a la tabla de la base de datos
    if(waterboard.uid==null)
    waterboard.uid=this.afs.createId();
    refUsuario.doc(waterboard.uid).set(Object.assign({},waterboard),{merge:true})
  }
  // retorna una lista de las juntas de agua las cuales no tengan un eliminado logico
  getWaterBoards(): Observable<any[]> {    
    // return this.afs.collection("waterboard",ref => ref.where('deleted', '==', false)).valueChanges();  
    return this.afs.collection("waterboard").valueChanges();
  }
  // retorna determinada junta en funcion al uid de la misma
  async getWaterBoardById(uid: string){
    try{
        let aux = await this.afs.collection("waterboard", 
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
  getWaterBoardById2(uid: string) :Observable<any>{
    console.log("ACTIVE SERVICIO");
    return this.afs.collection("waterboard", ref => ref.where('uid', '==', uid).where('deleted', '==', false)).valueChanges();
  }
  //Eliminar junta 
  async borrarWaterBoard(uid: string){
    console.log("fun Eminar OK: ", uid);
    const refWaterB = this.afs.collection("waterboard");    
    const aux = {deleted: true};
    refWaterB.doc(uid).set( {...aux}, { merge: true})
  }


}
