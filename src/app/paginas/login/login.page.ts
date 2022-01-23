import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginInfo } from 'src/app/modelo/loginInfo';
import { AuthService } from 'src/app/sevices/auth.service';
import { NotificacionesService } from 'src/app/sevices/notificaciones.service';
import { User } from 'src/app/shared/user.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginInfo:LoginInfo=new LoginInfo();//clase que contienen las credenciales del usuario
  
  user$: Observable<User>= this.authSvc.afAuth.user;
  constructor(
    
    private router:Router,    
    private authSvc: AuthService,
    private notificaciones:NotificacionesService

  ) { }

  ngOnInit() {
  }
  async login(param){        
    // const user = await this.authSvc.login(this.loginInfo.correo,this.loginInfo.contrasenia);
    const user = await this.authSvc.login(param.value.email,param.value.password);
    
    if (user) {
      const verificacion=this.authSvc.isEmailVerified(user);           
      this.redirectUser(verificacion);      
      console.log("Usuario-> "+user)        
      //this.redirectUser(isVerified);
    }else{
      this.notificaciones.notificacionToasError("Error en credenciales o cuenta no verificada.");
    }
    
  }  
  

    
// async onLoginGoogle() {
//     try {
//       const user = await this.authSvc.loginGoogle();
//       if (user) {
//         const isVerified = this.authSvc.isEmailVerified(user);
        
        
       
//       }
//     } catch (error) {
//       console.log('Error->', error);
//     }
//   }

  // async  redireccionar (isVerified: boolean,user:any){        
  //   const configApp= await this.configAppServ.getConfigById(user.uid);
    
  //   let params: NavigationExtras={
  //     queryParams:{
  //       infUser: this.loginInfo,
  //       userL: user,
  //       configParam:configApp
  //     }
  //   }
  //   if(isVerified){
  //     console.log("VErificado")
  //     this.router.navigate(["/view-user"],params);
  //   }else{
  //     this.notificationsServ.notificacionToast("Porfavor verifique su cuenta");
  //   }
  // }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['/view-all-waterboard']);      
    } else {
      this.router.navigate(['/msj-confirm']);
    }
  }




}
