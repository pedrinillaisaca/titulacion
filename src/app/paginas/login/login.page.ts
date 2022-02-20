import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { User } from 'src/app/shared/user.interface';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  passwordTypeInput  =  'password';
  
  user$: Observable<User>= this.authSvc.afAuth.user;
  constructor(
    
    private router:Router,    
    private authSvc: AuthService,
    private notificaciones:NotificacionesService,
    

  ) { }

  ngOnInit() {
try {  
  this.user$.subscribe(x=>{
    if(x.uid)
    this.router.navigate(['/search-waterboard']);      
  });
} catch (error) {
  
}
  }
  async login(param){        
    // const user = await this.authSvc.login(this.loginInfo.correo,this.loginInfo.contrasenia);
    const user = await this.authSvc.login(param.value.email,param.value.password);
    
    if (user) {//TENER CUIDADO CON ESTO 
      this.redirectUser(this.authSvc.isEmailVerified(user));                
    }else{
      this.notificaciones.notificacionToasError("Error en credenciales o cuenta no verificada");
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
      this.router.navigate(['/search-waterboard']);  
    } else {
      this.router.navigate(['/msj-confirm']);
    }
  }




  

}
