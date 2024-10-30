import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }  
  
  
  getUsers() {
    return this.http.get(`${this.apiServerUrl}/users`)
  }

  getUserById(id: any){
    return this.http.get(`${this.apiServerUrl}/users/user/${id}`);
  }

  deleteUser(id: any){
    return this.http.delete(`${this.apiServerUrl}/users/delete/${id}`);
  }
  
  editUser(formData: any, userId: any) {
    return this.http.put(`${this.apiServerUrl}/users/edit/${userId}`, formData);
  }

  getUsersTecnicos(){
    return this.http.get(`${this.apiServerUrl}/users/tecnicos`);
  } 
  

}
