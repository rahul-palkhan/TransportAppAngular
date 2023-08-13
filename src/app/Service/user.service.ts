import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../Models/user.model';
import{ Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User= new User();
  endpoint: string = "http://localhost:5025/api/User/AddUser"
  constructor(private http: HttpClient){}

  addNewUser(newUser:User): Observable<any>{
    return this.http.post(this.endpoint,newUser);
    
  }
  validateUser(username:string,password:string):Observable<any>{
    return this.http.post("http://localhost:5025/api/Auth",{username,password});
  }

  getUser(id:string):Observable<any>{
    return this.http.get("http://localhost:5025/api/User/GetUser/"+parseInt(id));

  }
}
