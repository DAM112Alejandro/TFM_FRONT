import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  items: MenuItem[]= [];
  
  ngOnInit(): void {
    this.setItems();
  }

  setItems(){
    this.items = [
      {label: 'Usuarios', icon: 'pi pi-user', routerLink: ['/admin/users']},
      {label: 'Trabajos', icon: 'pi pi-briefcase', routerLink:['/admin/jobs']},
      {label: 'Tipo de Trabajos', icon: 'pi pi-list', routerLink:['/admin/workTypes']}
    ];

  }

}
