export class WaterBoard{
    uid:string;
    nombre:string;    
    estado: boolean //Activa o inactiva
    comentario:string;
    tipoMonitoreo:string //manual | auto | ninguno 
    fotos_paths: string[]=[];
    responzables: string[]=[];
    provincia:string;
    deleted:string='false';
    ubicacion: {
        lat: number;
        lng: number;
       }


}
  