import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit{

title = 'muichiro';
showNav  :Boolean;
isRegisterPage: Boolean;

  
  
  constructor(private router : Router){
    this.showNav = true;
    this.isRegisterPage= false;


  }
  ngOnInit(): void {
    this.isRegisterPage= false;
    this.router.events.subscribe((even)=>{
      if(even instanceof NavigationEnd){
        if(even.url === '/login' || even.url === '/register'){
          this.showNav = false;
          this.isRegisterPage= true;
      }else{
        this.isRegisterPage= false;
      }
      
    }});
  }
  
}

