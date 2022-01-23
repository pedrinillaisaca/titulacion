import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sevices/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    private authSvc:AuthService,
    private router:Router
    
  ) { }

  ngOnInit() {
  }

  async registro(form){
    try {
      const user = await this.authSvc.register(form.value.email,form.value.password);
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
      this.router.navigate(["/msj-confirm"]);
      // this.registrarConfiguracion(user.uid);
    }
  }


  

}
