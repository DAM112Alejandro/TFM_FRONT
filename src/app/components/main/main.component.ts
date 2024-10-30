import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthService } from 'src/app/service/auth.service';
import { ROL, SESION } from 'src/app/utils/constants/constants';
import { UserService } from 'src/app/service/user.service';
import { JobsService } from 'src/app/service/jobs.service';
import { WorkTypesService } from 'src/app/service/work-types.service';
import { StatusService } from 'src/app/service/status.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    users: any;
    currentUser: any;
    selectedUserId: any;
    events: any[] = [];
    admin: boolean = false;
    displayDialog: boolean = false;
    selectedJob: any = null;
    jobId: any
    buttonTerminado: boolean = false;
    buttonIniciado: boolean = false;
    statusDescription: any;

    calendarOptions: CalendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        locale: 'es',
        initialView: 'dayGridMonth',  // Vista de mes como Google Calendar
        editable: false,  // Permite arrastrar y soltar eventos
        selectable: true,  // Permite seleccionar días
        selectMirror: true,
        dayMaxEvents: true,  // Muestra "más" si hay demasiados eventos
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: this.events,
        eventClick: this.openDialog.bind(this)
    };

    constructor(private authService: AuthService, private jobService: JobsService, private userService: UserService, private workTypeService: WorkTypesService,
        private statusService: StatusService
    ) { }
    ngOnInit(): void {
        this.getCurrentUser();
    }

    getCurrentUser() {
        if (sessionStorage.getItem(SESION.TOKEN)) {
            this.authService.getCurrentUser().subscribe((res) => {
                this.currentUser = res;
                this.isAdmin();

                if (!this.admin) {
                    this.getJobsByUser(this.currentUser.id);
                } else {
                    this.loadUsers();
                }
            }, (error) => {
                console.error('Error al obtener el usuario actual:', error);
            });
        }
    }

    getJobsByUser(user_id: any) {
        this.jobService.getJobsByUser(user_id).subscribe((jobs) => {
            const jobPromises = jobs.map((job: any) => {
                return this.getWorkTypeDescription(job.workType_id).then((description) => {
                    return {
                        title: description,
                        start: new Date(job.start_date),
                        end: new Date(job.finish_date),
                        allDay: false,
                        id: job.id,
                        status: job.status_id
                    };
                });
            });

            Promise.all(jobPromises).then((events) => {
                this.calendarOptions.events = events;
            });
        }, (error) => {
            console.error('Error al obtener trabajos:', error);
        });
    }


    getWorkTypeDescription(workType_id: any): Promise<string> {
        return new Promise((resolve, reject) => {
            this.workTypeService.getWorkType(workType_id).subscribe((workType) => {
                resolve(workType.description);
            }, (error) => {
                console.error('Error al obtener tipo de trabajo:', error);
                resolve('Sin descripción');
            });
        });
    }

    loadUsers() {
        this.userService.getUsersTecnicos().subscribe((users) => {
            this.users = users;
            console.log('hola', users);
        }, (error) => {
            console.error('Error al cargar usuarios:', error);
        });
    }

    isAdmin() {
        this.admin = this.currentUser.rolDescription === ROL.ADMIN;
    }

    onUserChange() {
        if (this.selectedUserId) {
            this.getJobsByUser(this.selectedUserId);
        }
    }

    openDialog(arg: any) {
        this.jobId = arg.event.id;
        this.displayDialog = true;
        if (arg) { 
            this.jobService.getJobById(this.jobId).subscribe((job) => {
                this.selectedJob = job;
                console.log(job);
                
            }, (error) => {
                console.error('Error al obtener trabajo:', error);
            });
        }
    }

    setStatusFinalizado() {
        this.jobService.setStatusFinalizado(this.jobId).subscribe((job) => {
            console.log('Trabajo finalizado:');
            this.getJobsByUser(this.currentUser.id);
        });
        this.displayDialog = false; 
      }

      setStatusIniciado() {
        this.jobService.setStatusIniciado(this.jobId).subscribe((job) => {
            console.log('Trabajo iniciado:');
            this.getJobsByUser(this.currentUser.id);
        });
        this.displayDialog = false;

      }
    
      closeDialog() {
        this.displayDialog = false;
    }
    
}
