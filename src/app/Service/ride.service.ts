import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from '../Models/ride.model';
import { PRide } from '../Models/p-ride';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private ride:Ride=new Ride();
  constructor(private http:HttpClient) { }
  getRideByUserId(id:number):Observable<any>{
    return this.http.get("http://localhost:5025/api/Ride/GetRideByUserId/"+id);
  }

  addRide(ride:PRide):Observable<any>{
    return this.http.post("http://localhost:5025/api/Ride/AddRide",ride);
  }
}
