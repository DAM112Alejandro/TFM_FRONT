import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { RolService } from 'src/app/service/rol.service';
import { WorkTypesService } from 'src/app/service/work-types.service';

@Component({
  selector: 'app-work-types',
  templateUrl: './work-types.component.html',
  styleUrls: ['./work-types.component.css']
})
export class WorkTypesComponent implements OnInit{

  workType: any = null;
  worktypes: any;
  displayEdit: boolean = false;
  displayConfirmation: boolean =false;
  workTypeId: any = null;
  

  constructor(private authService: AuthService, private worktypeService: WorkTypesService,
    private router: Router,
  ){}

 ngOnInit(): void {
   this.getWorkTypes();
  };

  getWorkTypes(){
    this.worktypeService.getWorkTypes().subscribe((worktype) =>{
      this.worktypes = worktype;
    })
  }


  deleteWorktype() {
    this.worktypeService.deleteWorkType(this.workTypeId).subscribe(() => {
      this.getWorkTypes();
      this.cancelDelete()
    });
  }

  editWorktype(id:any) {
    this.router.navigate(['workType/edit/', id]);
  }

  addWorktype() {
    this.router.navigate(["workType/add"])
  }


  getTime(time: number) {
   let hours = Math.floor(time / 100);   
   let minutes = (time % 100)*0.6 ;
   return `${hours}h ${minutes}m`;
  }

  confirmDelete(workType: any) {
    this.workType = workType;
    this.workTypeId = workType.id;
    this.displayConfirmation = true;
  }

  cancelDelete() {
    this.displayConfirmation = false;
  }
}
