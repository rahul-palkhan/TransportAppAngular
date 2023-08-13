import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from '../Models/user.model';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public username:string;
  public password:string;
  public rpassword:string;
  public carOwner:number;
  public mismatch: boolean=false;
  public user:User;
  public success:boolean;

  constructor(private userService : UserService, private route:Router) {
    this.user=new User();
   }

  rider(){
    this.carOwner=0;
    }
    
    owner(){
      this.carOwner=1;
      }

  ngOnInit(): void {
    this.success=false;
  }

  validate(){
    if(this.password==this.rpassword){
      this.mismatch=false;
      this.user.userName=this.username;
      this.user.passcode=this.password;
      this.user.carOwner=this.carOwner;
      this.userService.addNewUser(this.user).subscribe((data:any)=>{console.log(data);});
      console.log("validate called");
      this.user= new User();
      this.username=null;
      this.password=null;
      this.rpassword=null;
      this.success=true;
      this.route.navigate(['/login']);
    }
    else{
      this.mismatch=true;
    }

  }
}
