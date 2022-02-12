import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { PhotoService, UserPhoto } from '../../services/photo.service';
import { BackButtonService } from '../../services/back-button.service';



@Component({
  selector: 'app-galery-present',
  templateUrl: './galery-present.page.html',
  styleUrls: ['./galery-present.page.scss'],
})


export class GaleryPresentPage implements OnInit {
  loading:any;
    constructor(
      public photoService: PhotoService,
      public actionSheetController: ActionSheetController,
      private backboton:BackButtonService,
      public loadingController:LoadingController
      ) {}

    async ngOnInit() {
      await this.photoService.loadSaved();
    }
  
    public async showActionSheet(photo: UserPhoto, position: number) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Photos',
        buttons: [{
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
           }
        }]
      });
      await actionSheet.present();
    }

    gotoBack(){
      // this.photoService.savedFirestorage();
      this.photoService.returnFotos();
      this.backboton.backApp();
    }
   
  llamarFoto(){
    this.photoService.addNewToGallery()
  }    
}
