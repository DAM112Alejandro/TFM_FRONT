import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { SESION } from 'src/app/utils/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  logUser: any = {
    "username": "",
    "password": ""
  }
  messages: Message[] = [];
  showError = false;
  saltRounds = 10; 

  
  constructor(public readonly router: Router,
    public readonly authService: AuthService,
  ){
    
  }

  ngOnInit(): void {
    if (sessionStorage.getItem(SESION.TOKEN)) {
      this.router.navigateByUrl('main')
    }
  }

 

  login(): void {
    this.authService.login(this.logUser.username, this.logUser.password).subscribe((res) => {
      if(res.success) {
        sessionStorage.setItem(SESION.TOKEN, JSON.stringify(res.access_token));
        const expiryTime = Date.now() + 60 * 60 * 1000;
        sessionStorage.setItem(SESION.TOKEN_EXPIRED, expiryTime.toString());
        this.router.navigateByUrl('main');
      } else {
        sessionStorage.removeItem(SESION.TOKEN);
        this.messages = [{severity: 'error', summary: 'Error', detail: res.detail}];
      }
    })
  }
}
