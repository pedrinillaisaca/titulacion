import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/user.interface';
import { AuthService } from 'src/app/sevices/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-msj-confirm',
  templateUrl: './msj-confirm.page.html',
  styleUrls: ['./msj-confirm.page.scss'],
})
export class MsjConfirmPage implements OnInit {
  
  user$: Observable<User> =this.authSvc.afAuth.user;  
  constructor(
    private authSvc:AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }
  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  redirectLogin(){
    this.router.navigate(['/login']); 
  }
  // ngOnDestroy(): void {
  //   this.authSvc.logout();
  // }

}
