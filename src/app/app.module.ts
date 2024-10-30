import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { InterceptorService } from './service/interceptor.service';
import { AuthService } from './service/auth.service';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { UsersComponent } from './components/users/users.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { WorkTypesComponent } from './components/work-types/work-types.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { WorkTypesService } from './service/work-types.service';
import { TableModule } from 'primeng/table';
import { WorktypeDetailsComponent } from './components/worktype-details/worktype-details.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from './service/user.service';
import { RolService } from './service/rol.service';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { DropdownModule } from 'primeng/dropdown';
import { JobsDetailComponent } from './components/jobs-detail/jobs-detail.component';
import { JobsService } from './service/jobs.service';
import { StatusService } from './service/status.service';
import { CalendarModule } from 'primeng/calendar';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    JobsComponent,
    WorkTypesComponent,
    WorktypeDetailsComponent,
    UserDetailComponent,
    JobsDetailComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    MenubarModule,
    MessagesModule,
    PasswordModule,
    InputTextModule,
    InputNumberModule,
    TabMenuModule,
    FullCalendarModule,
    TableModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
  

  ],
  providers: [
    AuthService,
    {provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    WorkTypesService,
    {provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    UserService,
    {provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    RolService,
    {provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    JobsService,
    {provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    StatusService,
    {provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
