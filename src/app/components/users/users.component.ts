import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Role } from 'src/app/models/rol.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { RolService } from 'src/app/service/rol.service';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  user: any = null;
  users: any;
  displayEdit: boolean = false;
  userForm: FormGroup | undefined;
  displayConfirmation: boolean =false;
  userId: any = null;
  userRolDescription: any;

  constructor(private userService: UserService, 
    private router: Router, private rolService: RolService,
  ){ }
  
  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;

      const roleObservables: Observable<Role>[] = this.users.map((user: User) => 
        this.rolService.getRoleById(user.rol_id)
      );
      forkJoin(roleObservables).subscribe((roles: Role[]) => {
        this.users.forEach((user: User, index: number) => {
          user.rolDescription = roles[index].description;
        });
      });
    });
  }


  deleteUser(){
    this.userService.deleteUser(this.userId).subscribe(() => {
      this.getUsersWithRoles();
      this.cancelDelete();
    });
  }

  editUser(id:any) {
    this.router.navigate(['user/edit/', id]);
  }


  confirmDelete(selectedUser: any) {
    this.user = selectedUser;
    this.userId = selectedUser.id;
    this.displayConfirmation = true;
  }

  cancelDelete() {
    this.displayConfirmation = false;
  }

}
