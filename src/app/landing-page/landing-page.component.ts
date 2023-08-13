import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

//import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
import { Car } from '../Models/car.model';
import { CarService } from '../Service/car.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Models/user.model';
import { UserService } from '../Service/user.service';
import { Ride } from '../Models/ride.model';
import { RideService } from '../Service/ride.service';
import { PRide } from '../Models/p-ride';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  
})
export class LandingPageComponent implements OnInit {

  public car: Car[];
  public user:User;
  public destinations:string[]=["Waverock","Capgemini/Cyient","Accenture","Wipro circle","Microsoft","Infosys","IIT Circle","The Skyview","Galaxy by Auro Reality","Knowledge city park","LV Prasad Eye Institute","TV9 Banjara Hills","Lifestyle Begumpet","Wesley College","Vikrampuri- Toyota","Tirumalagiri","Neredmet Crossroads","Lavish Resturant","Radhika Multiplex","ECIL X Roads"];
  public newRideStart:string=this.destinations[0];
  public newRideEnd:string=this.destinations[0];
  public newRideCapacity:number=4;
  public newRide:Ride;
  public newRideTime:string;
  public start:string=this.destinations[0];
  public end:string=this.destinations[0];
  public searchTime:string;
  public result:Car[]=[];
  public upComingRides:Ride[]=[];
  public poolRide:PRide;
  
  constructor(private service:CarService, private route:ActivatedRoute,private userService:UserService, private rideService:RideService) { 
    this.service.getAllCars().subscribe(
      response=>{
        this.car=response;
      },
      error=>console.log(error)
      )
      this.user=new User();
  }
public id:string;

  ngOnInit(): void {
    this.upComingRides.splice(0,this.upComingRides.length);
    let Id=this.route.snapshot.paramMap.get('id');
    this.id=Id;
    this.userService.getUser(this.id).subscribe((data:any)=>this.user=data);
    this.rideService.getRideByUserId(Number(this.id)).subscribe((res =>this.upComingRides=res),error=>console.log(error));
    console.log(this.upComingRides.length);

  }
  displayStyle="none";
  openPopup(){
    this.displayStyle="block";
  }

  closePopup(){
    this.displayStyle="none";
  }

  addCar(){
    let newcar:Car=new Car();
    newcar.capacity=4;
    newcar.driverName=this.user.userName;
    newcar.start=this.newRideStart;
    newcar.end=this.newRideEnd;
    newcar.timing=this.newRideTime;
    this.service.addCar(newcar).subscribe((data:any)=>console.log(data));
    console.log("inside add car method");
    this.closePopup();
   console.log(this.newRideStart,this.newRideEnd,this.newRideTime);
    
  }
  search(){
    console.log("search start");
    this.result.splice(0,this.result.length);
    for(let i=0;i<this.car.length;i++){
      if(this.car[i].start==this.start&&this.car[i].end==this.end&&this.car[i].timing>this.searchTime){
        this.result.push(this.car[i]);
        console.log(this.result[i]);
      }
    }
    console.log("search ended");
  }

  setStart(e:any){
    this.start=e.target.value;
  }
  setEnd(e:any){
    this.end=e.target.value;
  }
  newSetStart(e:any){
    this.newRideStart=e.target.value;
    console.log(this.newRideStart);
  }
  newSetEnd(e:any){
    this.newRideEnd=e.target.value;
    console.log(this.newRideEnd);
  }

  poolIn(car:Car){
    this.poolRide=new PRide();
    this.poolRide.userId=Number(this.id);
    this.poolRide.carId=car.carId;
    this.poolRide.start=car.start;
    this.poolRide.end=car.end;
    this.poolRide.noOfSeats=1;
    this.poolRide.isCompleted=false;
    this.car[this.car.findIndex(x=>x.carId==car.carId)].capacity-=1;
    this.rideService.addRide(this.poolRide).subscribe(error=>console.log(error));
  }
}
