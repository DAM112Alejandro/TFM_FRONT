import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { WorkTypesComponent } from './components/work-types/work-types.component';
import { UsersComponent } from './components/users/users.component';
import { WorktypeDetailsComponent } from './components/worktype-details/worktype-details.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { JobsDetailComponent } from './components/jobs-detail/jobs-detail.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent,
    children: [
      {path : 'main', component: MainComponent},
      {path : 'admin', component: AdminComponent , children: [
        {path: 'jobs', component: JobsComponent},
        {path: 'workTypes', component: WorkTypesComponent,},
        {path: 'users', component: UsersComponent},
        
      ]
      },
      {path: 'workType/edit/:id', component: WorktypeDetailsComponent},
      {path: 'workType/add', component: WorktypeDetailsComponent},
      {path: 'user/edit/:id', component: UserDetailComponent },
      {path: 'job/edit/:id', component: JobsDetailComponent},
      {path: 'job/add', component: JobsDetailComponent},
      
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
