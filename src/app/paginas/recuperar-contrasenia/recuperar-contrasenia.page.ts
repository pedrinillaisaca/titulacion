import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sevices/auth.service';
import { NotificacionesService } from 'src/app/sevices/notificaciones.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  constructor(
    private authSvc:AuthService,
    private router:Router,
    private not_ser:NotificacionesService
  ) { }

  ngOnInit() {
  }
  async recuva(form){
    try {
      try {
        await this.authSvc.resetPassword(form.value.email);
        this.router.navigate(["/login"]);
        this.not_ser.confirmacion('Enviamos un mensaje de recuperación a su correo','');
      } catch (error) {
        this.not_ser.notificacionToasError(error);
      }
    } catch (error) {
      console.log('Error', error);
      this.not_ser.notificacionToasError(error)
    }
  } 


}
