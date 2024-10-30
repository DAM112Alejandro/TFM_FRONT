import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
 
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get<any>(`${this.apiServerUrl}/trabajos`);
  }  
  
  getJobById(jobId: string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/trabajos/${jobId}`);
  }
  
  updateJob(id: any, jobData: any) {
    return this.http.put<any>(`${this.apiServerUrl}/trabajos/update/${id}`, jobData);
  }
  
  createJob(jobData: any) {
    return this.http.post<any>(`${this.apiServerUrl}/trabajos/add`, jobData);
  }
  
  deleteJob(id: any): Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/trabajos/delete/${id}`);
  } 
  
  getJobsByUser(user_id: any) : Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/trabajos/user/${user_id}`);
  }  

  setStatusFinalizado(jobId: any) {
    return this.http.put<any>(`${this.apiServerUrl}/trabajos/status/finalizado/${jobId}`,{});
  } 
  
  setStatusIniciado(jobId: any) {
    return this.http.put<any>(`${this.apiServerUrl}/trabajos/status/iniciado/${jobId}`,{});
  }


}
