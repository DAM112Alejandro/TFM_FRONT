import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  getStatusById(id: any): Observable<Status>{
    return this.http.get<any>(`${this.apiServerUrl}/status/${id}`);
  }
  getStatus(){
    return this.http.get<any>(`${this.apiServerUrl}/status`);
  }

}
