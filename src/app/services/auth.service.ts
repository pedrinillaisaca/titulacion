import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';

import { Observable,of } from 'rxjs';
import { NotificacionesService } from './notificaciones.service';
import { Router } from '@angular/router';
import { last, switchMap } from 'rxjs/operators';

// import * as firebase from 'firebase/compat';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  public user1$: Observable<any>;

  constructor(public afAuth: AngularFireAuth,
    public notificationServ:NotificacionesService,
    private router:Router,
    private afs: AngularFirestore) {
    this.user$=this.afAuth.authState.pipe(
      switchMap((user) => {     
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).update;
        }
        return of(null);
        
      })
    );
    

     }

     async resetPassword(email: string): Promise<void> {
      try {
        return this.afAuth.sendPasswordResetEmail(email);
      } catch (error) {
        console.log('Error->', error);
        this.notificationServ.notificacionToasError(error.message);
        
      } 
    }
  
    //  async loginGoogle(): Promise<User> {
    //    try {
    //      const { user } = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
    //      this.updateUserData(user);
    //      return user;
    //    } catch (error) {
    //      console.log('Error->', error);
    //    }
    //  }
    
  
    async register(email: string, password: string): Promise<User> {
      try {
        const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);      
        // this.notificationServ.confirmacion("Registro Existoso","");
        return user;
      } catch (error) {
        console.log('Error->', error);
        this.notificationServ.notificacionToasError(error.message);
      }
    }


    async registerAndUser(email: string, password: string,name:string): Promise<User> {
      try {
        const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);   
        
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
        const data: User = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: name,
        };    
        userRef.set(data, { merge: true });                      
        return data;
      } catch (error) {
        console.log('Error->', error);
        this.notificationServ.notificacionToasError(error.message);
      }


    }

  async registerComplete(email: string, password: string, name: string, lastname:string): Promise<User> {
    try {
      const {user}= await this.afAuth.createUserWithEmailAndPassword(email,password);
      
      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: name+" "+lastname
      };                       
      user.updateProfile(data);//VALIDO POR SI ACASO QUIERO PONER UNA FOTO DE PERFIL O DEMAS COSAS
      const nombres=name+" "+lastname
      this.updateUserData(user,nombres);
      return user
    } catch (error) {
      console.log('Error->', error);
      this.notificationServ.notificacionToasError(error.message);
    }       
  }

    getUserById(uid: string) :Observable<any>{          
      return this.afs.collection("users", ref => ref.where('uid', '==', uid)).valueChanges();
    }

    updateUserAppById(uid: string){          
      this.user1$= this.afs.collection("users", ref => ref.where('uid', '==', uid)).valueChanges();
    }
    
  
    async login(email: string, password: string): Promise<User> {
      try {
        const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
        // this.updateUserData(user);
        return user;
      } catch (error) {
        console.log('Error->', error);
        this.notificationServ.notificacionToasError(error.message);
      }
    }
  
    async sendVerifcationEmail(): Promise<void> {
      try {
        return (await this.afAuth.currentUser).sendEmailVerification();
      } catch (error) {
        console.log('Error->', error);
        this.notificationServ.notificacionToasError(error.message);
      }
    }
  
    isEmailVerified(user: User): boolean {
      return user.emailVerified === true ? true : false;
    }
  
    async logout(): Promise<void> {
      this.user1$=null
      try {
        await this.afAuth.signOut();
      } catch (error) {
        console.log('Error->', error);
        this.notificationServ.notificacionToasError(error.message);
      }
    }
  
    private updateUserData(user: User, nombres:string) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: nombres
      };
  
      return userRef.set(data, { merge: true });
    }
  
    private redirectUser(isVerified: boolean): void {
      if (isVerified) {
        this.router.navigate(['/view-user']);      
      } else {
        this.router.navigate(['msj-confirm']);
      }
    }
  
}
