export class WaterBoard{
    uid:string;
    nombre:string;    
    estado: boolean //Activa o inactiva
    comentario:string;
    tipoMonitoreo:string //manual | auto | ninguno 
    fotos_paths: string[]=[];
    responzables: string[]=[];
    provincia:string;
    ubicacion: {
        lat: number;
        lng: number;
       }
}
  