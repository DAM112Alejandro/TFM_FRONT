import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Password } from 'primeng/password';
import { RolService } from 'src/app/service/rol.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  
  userId!: string
  userForm!: FormGroup;
  user: any;
  rolesList: any;

  constructor(private userService: UserService, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private rolService: RolService)
              { 
                this.buildUserForm();
              }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(!params['id']){
       this.router.navigate(['admin/users']) 
      }else {
        this.userId = params['id'];
        this.getUser(this.userId);
        this.getRolList();
      }
    });

  }

  getUser(id: string) {
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
      
      this.userForm.patchValue({
        username : this.user.username,
        email: this.user.email,
        rol_id: this.user.rol_id,
      });
    });
  }

  buildUserForm() {
    this.userForm = this.formBuilder.group({
      username: [this.user?.username ? this.user.username : '', Validators.required],
      email: [this.user?.email? this.user.email : '', [Validators.required, Validators.email]],
      rol_id: [this.user?.rol_id ? this.user.rol_id : '', [Validators.required]],
    });
  }

  getRolList(){
    this.rolService.getAllRoles().subscribe(rolList => {
      this.rolesList = rolList;
    });
  }

  onSubmit() {
    if(this.userForm.valid){
      const formData = this.userForm.value
      console.log(formData);
      
      this.userService.editUser(formData, this.userId).subscribe(
        response => {
          this.router.navigate(['admin/users']);
        }
      )
      this.userForm.reset();
    }else{
      console.error("Formulario inválido")
    }
    
  }


}
