import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../sevices/auth.service';
import { NotificacionesService } from '../sevices/notificaciones.service';
import { User } from '../shared/user.interface';



@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  user$: Observable<User>= this.authSvc.afAuth.user;  
  band:boolean=false
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private notifi:NotificacionesService
  ){}
  
  canActivate():Promise<boolean>{
    return new Promise( async (resolve, reject)=>{

      this.user$.subscribe( (responseData) =>{
      // console.log("UID: ",responseData['uid'])
      if(responseData != null){
        resolve(true)
      }else{
        resolve(false)
        this.router.navigate(['/login'])
        this.notifi.notificacionToasError("Acceso denegado");
      }
      }
      );
      
      // setTimeout(()=>{
      //   resolve(true);
      //   true;
      // },3000);
    })
  }
      
  
}
