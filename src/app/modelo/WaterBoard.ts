import { Responsable } from './Responsable';
export class WaterBoard{
    uid:string;
    nombre:string;    
    estado: boolean //Activa o inactiva
    comentario:string;
    tipoMonitoreo:string //manual | auto | ninguno 
    fotos_paths: string[]=[];
    listaResponsables:string[]=[]
    provincia:string;
    deleted:string='false';
    registradorName:string;    
    registradorUid:string;    
    ubicacion: {
        lat: number;
        lng: number;
       }


}
  