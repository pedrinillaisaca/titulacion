import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, CameraPhoto, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public fotos_paths: string[] = [];//Arreglo de paths 
  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor(
    private platform: Platform,
    private storage: AngularFireStorage
  ) { }

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    // If running on the web...
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
 

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });
            
    this.photos.unshift(await this.savePicture(capturedPhoto));             
    console.log(this.photos)
    
    // Cache all photo data for future retrieval
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  // Save picture to file on device
  private async savePicture(cameraPhoto: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // if (this.platform.is('hybrid')) {
    //   // Display the new image by rewriting the 'file://' path to HTTP
    //   // Details: https://ionicframework.com/docs/building/webview#file-protocol
    //   return {
    //     filepath: savedFile.uri,
    //     webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    //   };
    // } else {
    //   // Use webPath to display the new image instead of base64 since it's
    //   // already loaded into memory
    //   return {
    //     filepath: fileName,
    //     webviewPath: cameraPhoto.webPath,
    //   };
    // }
    return {
      filepath: fileName,
      // webviewPath: cameraPhoto.webPath,
      webviewPath: base64Data,
    };
  }

  // Read camera photo into base64 format based on the platform the app is running on



  private async readAsBase64(cameraPhoto: Photo) {
    const response = await fetch(cameraPhoto.webPath!)
    const blob = await response.blob()
    return await this.convertBlobToBase64(blob) as string
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  }

  public async savedFirestorage() {    
    for (let foto of this.photos) {
      this.fotos_paths.unshift(await this.startUpload(foto.webviewPath));
    } 
    return this.fotos_paths   
  }

  public async returnFotos() {     
    await this.loadSaved();          
  }

  async startUpload(file: string): Promise<string> {
    return new Promise(resolve => {
      console.log(file);
      var t=file.split(',')[1];      
      let byteChacarters = atob(t);
      const path = `images/${new Date().getTime()}.jpg`;

      let image = file;
      const data = {
        ref: path,
        type: 'image',
        url: null,
        name: 'image',
        size: this.fileSize(Number(byteChacarters.length))
      }

      try {
        let ref = this.storage.ref(path);
        let task = ref.putString(image, 'data_url');

        task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(res => {
              const downloadURL = res;
              resolve(downloadURL);
              return;
            });
          })

        ).subscribe();


      } catch (error) {
        console.log(JSON.stringify(error));
        console.log("Error B===D: ");
      }
    });

  }
  fileSize(sizeInBytes: number) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);

    const size = sizeInBytes / Math.pow(1024, power);
    const formattedSize = Math.round(size * 100) / 100;
    const unit = units[power];
    return size ? `${formattedSize} ${unit}` : '0';
  }


  clearStorage() {
    Storage.clear();
  }


}
