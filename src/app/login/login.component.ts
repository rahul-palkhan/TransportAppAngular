import { Component, OnInit } from '@angular/core';
import { Login } from '../Models/login.model';
import { User } from '../Models/user.model';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService, private route:Router) {
    this.user=new User;
    this.login=new Login;
}
  public user:User;
  public username:string;
  public password:string;
  public login:Login;
  public mismatch:boolean=false;

  ngOnInit(): void {
}
validate(){

  this.userService.validateUser(this.username,this.password).subscribe((data:any)=>{
    this.login=data;
    console.log(data);});
    
    if(this.login!=null){
      this.route.navigate(['/landingPage/',this.login.userId]);
      this.mismatch=false;
      console.log("redirecting");
    }
    
    else{
      this.mismatch=true;
      //console.log(this.login);
    }
}
}
