import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'src/app/service/jobs.service';
import { StatusService } from 'src/app/service/status.service';
import { UserService } from 'src/app/service/user.service';
import { WorkTypesService } from 'src/app/service/work-types.service';
import { licensePlateValidator } from 'src/app/validator/licensePlateValidator';
import { phoneValidator } from 'src/app/validator/phoneValidator';
import { workType } from 'src/app/models/worktype.model';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-jobs-detail',
  templateUrl: './jobs-detail.component.html',
  styleUrls: ['./jobs-detail.component.css']
})
export class JobsDetailComponent implements OnInit {

  jobId!: string;
  jobForm!: FormGroup;
  job: any;
  statusList: any;
  workTypesList: any;
  usersList: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private jobService: JobsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private statusService: StatusService,
    private worktypeService: WorkTypesService
  ) { this.buildForm(); }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params && params['id']) {
        this.jobId = params['id'];
        this.getJobDetail(this.jobId);

      }
    });
    this.getStatus();
    this.getWorkTypes();
    this.getUsers();
  }

  buildForm() {
    this.jobForm = this.formBuilder.group({
      registration_date: [this.job?.registration_date ? this.job?.registration_date : ''],
      appointment_date: [this.job?.appointment_date ? this.job?.appointment_date : '', [Validators.required]],
      start_date: [this.job?.start_date ? this.job?.start_date : '', [Validators.required]],
      finish_date: [this.job?.finish_date ? this.job?.finish_date : ''],
      license_plate: [this.job?.license_plate ? this.job?.license_plate : '', [Validators.required, licensePlateValidator()]],
      client_phone: [this.job?.client_phone ? this.job?.client_phone : '', [Validators.required, phoneValidator()]],
      user_id: [this.job?.user_id ? this.job?.user_id : '', [Validators.required]],
      status_id: [this.job?.status_id ? this.job?.status_id : '', [Validators.required]],
      workType_id: [this.job?.workType_id ? this.job?.workType_id : '', [Validators.required]]
    });
  }

  getUsers() {
    this.userService.getUsersTecnicos().subscribe(users => {
      this.usersList = users;
    });
  }
  getWorkTypes() {
    this.worktypeService.getWorkTypes().subscribe(workType => {
      this.workTypesList = workType;
    })
  }
  getStatus() {
    this.statusService.getStatus().subscribe(status => {
      this.statusList = status;
    });
  }
  getJobDetail(id: string) {
    this.jobService.getJobById(this.jobId).subscribe(res => {
      this.job = res;
      console.log(this.job);

      this.jobForm.patchValue({
        registration_date: this.job?.registration_date ? new Date(this.job?.registration_date) : '',
        appointment_date: this.job?.appointment_date ? new Date(this.job?.appointment_date) : '',
        start_date: this.job?.start_date ? new Date(this.job?.start_date) : '',
        finish_date: this.job?.finish_date ? new Date(this.job?.finish_date) : '',
        license_plate: this.job?.license_plate ? this.job?.license_plate : '',
        client_phone: this.job?.client_phone ? this.job?.client_phone : '',
        user_id: this.job?.user_id ? this.job?.user_id : '',
        status_id: this.job?.status_id ? this.job?.status_id : '',
        workType_id: this.job?.workType_id ? this.job?.workType_id : ''
      })
    });
  }


  onSubmit() {
    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }
  
    const jobData = { ...this.jobForm.value };
  
    // Convertir fechas a formato ISO
    jobData.registration_date = moment().tz('Europe/Madrid').toISOString();
    jobData.appointment_date = moment(jobData.appointment_date).tz('Europe/Madrid').toISOString();
    jobData.start_date = moment(jobData.start_date).tz('Europe/Madrid').toISOString();
  
    this.worktypeService.getWorkType(jobData.workType_id).subscribe((workType: workType) => {
      if (workType && workType.time) {
        const hours = Math.floor(workType.time / 100);
        const minutes = (workType.time % 100) * 0.6;
  
        const finishDate = moment.tz(jobData.start_date, 'Europe/Madrid');
        finishDate.add(hours, 'hours').add(minutes, 'minutes');
  
        jobData.finish_date = finishDate.toISOString();
  
        // Envía el jobData al servicio
        if (this.job) {
          this.jobService.updateJob(this.jobId, jobData).subscribe(
            () => {
              this.router.navigate(['/admin/jobs']);
            },
            (error: any) => {
              console.error('Error al actualizar el trabajo:', error);
            }
          );
        } else {
          console.log(jobData);
          this.jobService.createJob(jobData).subscribe(
            () => {
              this.router.navigate(['/admin/jobs']);
            },
            (error: any) => {
              console.error('Error al crear el trabajo:', error);
            }
          );
        }
      }
    });
  }
  
  
}


