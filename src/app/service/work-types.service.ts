import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { workType } from '../models/worktype.model';

@Injectable({
  providedIn: 'root'
})
export class WorkTypesService {
 
  private apiServerUrl = environment.apiBaseUrl

  constructor( private http: HttpClient,
    private readonly router : Router
  ) { }
  
  
  getWorkTypes() {
    return this.http.get(`${this.apiServerUrl}/workTypes`);
  }

  getWorkType(id: any): Observable<workType> {
    return this.http.get<workType>(`${this.apiServerUrl}/workTypes/${id}`);
  }

  addWorjWorkType(workType: any):Observable<any> {
    return this.http.post(`${this.apiServerUrl}/workTypes/add`, workType);
  }

  editWorkType(id: any , workType: any):Observable<any> {
    return this.http.put(`${this.apiServerUrl}/workTypes/update/${id}`, workType);
  }

  deleteWorkType(id: any){
    return this.http.delete(`${this.apiServerUrl}/workTypes/delete/${id}`);
  }
}
