import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Camera,CameraPhoto, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Foto } from '../modelo/foto.interface';
import { LoadingController } from '@ionic/angular';
import { filter, finalize, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FotoService {
  public fotos: Foto[]=[];//Arreglo
  public fotos_paths: string[]=[];//Arreglo de paths 
  private PHOTO_STORAGE: string ='fotos';

  constructor(
    private storage: AngularFireStorage,
    private loadingCrtl: LoadingController   
  ) { }



  public async addNewToGalery(){
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })

    // this.fotos.unshift({
    //   filepath: 'foto_',
    //   webviewPath: fotoCapturada.webPath
    // })

    const savedImageFile = await this.savePicture(fotoCapturada)
    this.fotos.unshift(savedImageFile)

    Storage.set({
      key:this.PHOTO_STORAGE,
      value:JSON.stringify(this.fotos)
    })
    

  }
  public async savePicture(cameraPhoto: CameraPhoto){
    const base64Data=await this.readAsBase64(cameraPhoto)
    const fileName = new Date().getTime + '.jpeg';
    // const savedFile= await Filesystem.writeFile({
    //   path: fileName,
    //   data:base64Data,
    //   directory: Directory.Data
    // })
    return {
      filepath: fileName,
      webviewPath: base64Data
    }
    

  }

  public async readAsBase64(cameraPhoto: CameraPhoto){
    const response = await fetch(cameraPhoto.webPath!)
    const blob = await response.blob()
    return await this.convertBlobToBase64(blob) as string
  }

  convertBlobToBase64=(blob:Blob) => new Promise ((resolve,reject)=>{
    const reader = new FileReader
    reader.onerror=reject
    reader.onload=()=>{
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })


  public async loadSaved(){
    const listaFotos= await Storage.get({key:this.PHOTO_STORAGE})
    this.fotos= JSON.parse(listaFotos.value) || []   
    for(let foto of this.fotos){
      const readFile =await Filesystem.readFile({
        path: foto.filepath,
        directory: Directory.Data
      })
      foto.webviewPath=`data:image/jpeg;base64,${readFile.data}`      
    }
  }

  public async savedFirestorage(){
    for(let foto of this.fotos){     
      let readFile =await Filesystem.readFile({
        path: foto.filepath,
        directory: Directory.Data
      })
      // console.log('foto.filepath');
      // foto.webviewPath=`data:image/jpeg;base64,${readFile.data}`      
      
      // console.log(foto.webviewPath);
      this.startUpload(foto.webviewPath);
    }

  }

  async startUpload(file:string){
  
    let byteChacarters=atob(file.split(',')[1]);
    const path=`images/${new Date().getTime()}.jpg` ; 

    let image=file;
    const data={
      ref:path,
      type:'image',
      url: null,
      name: 'image',
      size: this.fileSize(Number(byteChacarters.length))
    }

    try{
      let ref=this.storage.ref(path);
      let task=ref.putString(image, 'data_url');
      const loading=await this.loadingCrtl.create({
        message: "Espere , subiendo foto"
      });
      await loading.present();

      task.percentageChanges().pipe(
        filter(val=> val ===100),
        tap(complete=>{
          setTimeout(()=>{
            loading.dismiss();

          },3500);
        })  
      ).subscribe();

      task.snapshotChanges().pipe(
        finalize(()=>{
          let downloadURL=ref.getDownloadURL()
          downloadURL.subscribe(url=> {
            data.url=url;
            console.log("download terminado"+url)
            this.fotos_paths.unshift(url);//guardar las urls
            // this.uploadFinished.emit(data);
          });
        })

      ).subscribe();


    }catch(error){
      console.log(JSON.stringify(error));
      console.log("Error B===D: ");
    }

  }

  fileSize(sizeInBytes: number){
    const units =['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power=Math.min(power,units.length-1);

    const size=sizeInBytes / Math.pow(1024,power);
    const formattedSize= Math.round(size*100)/100;
    const unit =units[power];
    return size ? `${formattedSize} ${unit}`: '0';
  }

  public async clearStorage(){
    await Storage.clear();
  }

}
