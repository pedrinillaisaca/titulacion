import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../shared/user.interface';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/firestore';



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
  
  formGroup: FormGroup | null = null;
  pedro:string
  
  constructor(
    private authSvc:AuthService,
    private afs: AngularFirestore,
    private router:Router,
    private fb: FormBuilder
    
  ) {
    this.formGroup = this.fb.group({
      password: ['', [Validators.required]],
      repeat_password: '',
      email:'',
      nombreUser:''
    });

    this.formGroup.get('repeat_password').setValidators(
      CustomValidators.equals(this.formGroup.get('password'))
    );
   }

  ngOnInit() {

  
  }

  onSubmit(){
    

  }

  async registro(){
    const password = this.formGroup.get('password').value as string;  
    const email = this.formGroup.get('email').value as string;    
    const nombreUser = this.formGroup.get('nombreUser').value as string;    
    try {
      const user = await this.authSvc.register(email,password);  
      // this.updateUserData(user,nombreUser);    
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redireccionar(isVerified,user);
        console.log("User->",user)        
        //this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }  
  private redireccionar (isVerified: boolean,user:any): void{
    if(isVerified){
      console.log("VErificado")
      this.router.navigate(["/view-user"]);//NO SE VA A USAR
    }else{
      this.router.navigate(["/msj-confirm"]);//esto es muy interesante
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





  
}
