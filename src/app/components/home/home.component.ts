import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { ROL, SESION } from 'src/app/utils/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items!: MenuItem[];
  isLoggedIn : boolean = false;
  user : any  = {};

  constructor(private readonly router: Router ,
    private readonly authService: AuthService
  ){}

  ngOnInit() {
    this.getCurrentUser();
    this.fillItems();
  }
   

  isLogged(){
    if(sessionStorage.getItem(SESION.TOKEN)){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
      this.router.navigate(['']);
    }
  }

  fillItems(){
    if(this.user.rolDescription === ROL.ADMIN){
      this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: 'main'
      },
      {
        label: 'Administración',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: 'admin/users'
      }];
    }else if (this.user.rolDescription === ROL.TECNICO){
      this.items = [
        {
          label: this.user.username,
          icon: 'pi pi-fw pi-user',
          routerLink: 'main',
          disabled: true
        }]
      }else if (!this.isLoggedIn){
        this.items=[]
      }
    }
  

  getCurrentUser(){
    if(sessionStorage.getItem(SESION.TOKEN)){
    this.authService.getCurrentUser().subscribe((res) =>{
      this.user = res;
      this.isLogged();
      this.fillItems();
    })
    }
    else{
     this.isLogged();
    }
  }
  



  login() {
    this.router.navigate(['login']);
  }
  register() {
    this.router.navigate(['register']);
  }
  volver() {
    sessionStorage.removeItem(SESION.TOKEN);
    window.location.href='';
  }
  


  
}
