import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get(`${this.apiServerUrl}/roles`);
  }

  getRoleById(id: any): Observable<Role> {
    return this.http.get<Role>(`${this.apiServerUrl}/roles/${id}`);
  }
}
