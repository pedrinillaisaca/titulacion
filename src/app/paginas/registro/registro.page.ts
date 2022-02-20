import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../shared/user.interface';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificacionesService } from '../../services/notificaciones.service';





function  equalsValidator(otherControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value: any = control.value;
    const otherValue: any = otherControl.value;
    return otherValue === value ? null : { 'notEquals': { value, otherValue } };
  };
}


export const CustomValidators = {
  equals: equalsValidator
};




@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  loading: any;
  formGroup: FormGroup | null = null;
  pedro:string
  LoadingController: any;
  
  constructor(
    private authSvc:AuthService,
    private afs: AngularFirestore,
    private router:Router,
    private fb: FormBuilder,
    private servnoti:NotificacionesService
    
  ) {
    this.formGroup = this.fb.group({
      password: ['', [Validators.required]],
      repeat_password: '',
      email:'',
      name:'',
      lastname:''
    });

    this.formGroup.get('repeat_password').setValidators(
      CustomValidators.equals(this.formGroup.get('password'))
    );
   }

  ngOnInit() {

  
  }


  async registro(): Promise<void>{
    const password = this.formGroup.get('password').value as string;  
    const email = this.formGroup.get('email').value as string;    
    const name = this.formGroup.get('name').value as string;   
    const lastname = this.formGroup.get('lastname').value as string;   

    try {         
      const user = await this.authSvc.registerComplete(email.trim(),password.trim(),name.trim(),lastname.trim());             
      // this.router.navigate(["/login"])
      // this.servnoti.notiErrorConTiempo("Registro Exitoso",2000);
      if (user) {
        this.redireccionar(this.authSvc.isEmailVerified(user))
      }
    } catch (error) {
      console.log('Error', error);
    }
  }  
  private redireccionar (isVerified: boolean): void{
    if(isVerified){
      console.log("VErificado")
      this.router.navigate(["/login"]);//NO SE VA A USAR
    }else{      
      this.router.navigate(["/msj-confirm"])        
      // this.registrarConfiguracion(user.uid);
    }
  }

  private updateUserData(user: User,nombreUsuario:string) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: nombreUsuario,
    };  

  }
  async presentLoading() {
    this.loading = await this.LoadingController.create({
      cssClass: 'normal',
      message: 'Registrando...',
    });
    await this.loading.present();
  }





  
}
