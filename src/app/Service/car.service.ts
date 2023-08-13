
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../Models/car.model';

@Injectable({
 providedIn: 'root'
})
export class CarService {

  private car: Car= new Car();
  endpoint: string = "http://localhost:5025/api/Car/GetAllCars"
  constructor(private http: HttpClient){}

  getAllCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.endpoint);
  }

  addCar(car:Car):Observable<any>{
    return this.http.post("http://localhost:5025/api/Car/AddCar",car);
    console.log("inside service");
  }
}
