import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import $ from 'jquery';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit{
logOut() {
this.auth.logOut();
}

title = 'muichiro';
showNav  :Boolean;
isRegisterPage: Boolean;
isAuthenticated : Boolean=false;
username: string="";
  
  
  constructor(private router : Router,private auth : AuthService){
    this.showNav = true;
    
    this.isRegisterPage= false;


  }
  ngOnInit(): void {
    this.isRegisterPage= false;
    this.isAuthenticated=this.auth.isAuthenthicated();
    this.router.events.subscribe((even)=>{
      if(even instanceof NavigationEnd){
        if(even.url === '/login' || even.url === '/register'){
          this.showNav = false;
          this.isRegisterPage= true;
          
      }else{
        this.isRegisterPage= false;
      }
      
    }});
    
    if(this.isAuthenticated){
      this.username=this.auth.getUsername();
    }
    $(document).ready(function(){
      var currentDate = new Date();
      console.log(currentDate);
     if(sessionStorage.getItem("expireAt")){
      var expirationDate =sessionStorage.getItem("expireAt");
      if(currentDate.getTime() < new Date(expirationDate || "").getTime()) {
          //normal application behaviour => session is not expired
         
      } else {
          //redirect users to login page or whatever logic you have in your app 
          //and remove the sessionStorage because it will be set again by previous logic
          sessionStorage.clear();
          window.location.replace("http://localhost:4200/login");
          
      }}
  });
    
    
  }
  
}

