import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { Status } from 'src/app/models/status.model';
import { User } from 'src/app/models/user.model';
import { workType } from 'src/app/models/worktype.model';
import { JobsService } from 'src/app/service/jobs.service';
import { StatusService } from 'src/app/service/status.service';
import { UserService } from 'src/app/service/user.service';
import { WorkTypesService } from 'src/app/service/work-types.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  
  job: any = null;
  jobs: any;
  displayEdit: boolean = false;
  jobForm: FormGroup | undefined;
  displayConfirmation: boolean =false;
  jobId: any = null;
  jobStatusDescription: any;
  jobUserUsername: any;
  jobWorkypeDescription: any;

  constructor(private jobsService: JobsService,
    private router: Router, private statusService: StatusService,
    private workTypeService: WorkTypesService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.jobsService.getJobs().subscribe((jobs: Job[]) => {
      this.jobs = jobs;
  
      const statusObservables: Observable<Status>[] = this.jobs.map((job: Job) =>
        this.statusService.getStatusById(job.status_id)
      );
  
      const userObservables: Observable<User>[] = this.jobs.map((job: Job) =>
        this.userService.getUserById(job.user_id)
      );
  
      const workTypeObservables: Observable<workType>[] = this.jobs.map((job: Job) =>
        this.workTypeService.getWorkType(job.workType_id)
      );
  
      forkJoin([forkJoin(statusObservables), forkJoin(userObservables), forkJoin(workTypeObservables)]).subscribe(
        ([statuses, users, workTypes]: [Status[], User[], workType[]]) => {
          this.jobs = this.jobs.map((job: Job, index: number) => ({
            ...job,
            jobStatusDescription : statuses[index]?.description,
            jobUserUsername : users[index]?.username,
            jobWorkytpeDescription : workTypes[index]?.description
          }));
        },
        error => {
          console.error("Error al obtener datos relacionados:", error);
        }
      );
    });
  }


  deleteJob() {
    this.jobsService.deleteJob(this.jobId).subscribe(() => {
      this.getJobs();
      this.cancelDelete();
    })
  }

  editJob(id:any) {
    this.router.navigate(['job/edit/', id]);
  }

  addJob() {
    this.router.navigate(["job/add"])
  }

  confirmDelete(job: any) {
    this.job = job;
    this.jobId = job.id;
    this.displayConfirmation = true;
  }

  cancelDelete() {
    this.displayConfirmation = false;
  }


}
