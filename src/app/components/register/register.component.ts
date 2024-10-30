import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
   
  logUser: any = {
    "username": "",
    "email": "",
    "password": ""
  }
  messages: Message[] = [];
  showMessage: boolean = false
  saltRounds = 10; 

  
  constructor(public readonly router: Router,
    public readonly authService: AuthService,
  ){
    
  }

  ngOnInit(): void {
  }

 

  register(): void {
    this.authService.register(this.logUser).subscribe((res) => {
      if(res.success) {
        this.router.navigateByUrl('login');
      } else {
        this.messages = [{severity: 'error', summary: 'Error' , detail: res.detail}];
      }
    })
  }
}
