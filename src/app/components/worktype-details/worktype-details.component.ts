import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkTypesService } from 'src/app/service/work-types.service';

@Component({
  selector: 'app-worktype-details',
  templateUrl: './worktype-details.component.html',
  styleUrls: ['./worktype-details.component.css']
})
export class WorktypeDetailsComponent implements OnInit {

  workTypeId!: string
  worktypeForm!: FormGroup;
  workType: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private workTypeService: WorkTypesService,
    private formBuilder: FormBuilder
  ) {
    this.buildWorkTypeDetailsForm();
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.workTypeId = params['id'];
        this.getWorkType(this.workTypeId);
      }
    });
  }

 
  getWorkType(id: string) {
    this.workTypeService.getWorkType(id).subscribe(worktype => {
      this.workType = worktype;
      
      this.worktypeForm.patchValue({
        description: this.workType.description,
        time: this.workType.time
      });
    });
  }

  buildWorkTypeDetailsForm() {
    this.worktypeForm = this.formBuilder.group({
      description: [this.workType?.description ? this.workType.description : '', Validators.required],
      time: [this.workType?.time? this.workType.time : '', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.worktypeForm.valid) {
      const formData = this.worktypeForm.value;
      
      if (this.workType) {
        this.workTypeService.editWorkType(this.workTypeId, formData).subscribe(
          response => {
            this.router.navigate(['/admin/workTypes']);
          },
          error => {
            console.error('Error al actualizar tipo de trabajo:', error);
          }
        );
      } else {
        this.workTypeService.addWorjWorkType(formData).subscribe(
          response => {
            this.router.navigate(['/admin/workTypes']);
          },
          error => {
            console.error('Error al agregar tipo de trabajo:', error);
          }
        );
      }
      this.worktypeForm.reset();
    } else {
      console.log('Formulario inválido');
    }
  }
}