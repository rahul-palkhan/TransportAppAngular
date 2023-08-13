import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  {path:'',redirectTo:'/login', pathMatch:'full'},
  {path:"login", component:LoginComponent},
  {path:"landingPage/:id",component:LandingPageComponent },
  {path:"signup",component:SignupComponent},
  {path:'',component:LoginComponent},
  {path:'**',pathMatch: 'full',component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
