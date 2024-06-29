import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
g : FormGroup;
isDanger : Boolean= false;
isSuccess : Boolean= false;
isSubmitted : Boolean= false;
message : String="";


  constructor(private auth:AuthService,private fb: FormBuilder,private router : Router){
    
    
    this.g=fb.group({username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }
  get username(){
    return this.g.get('username');
  }
  get password(){
    return this.g.get('password');
  }
  onSubmit(){
    
    this.isSubmitted=true;
    if(this.g.valid){
    this.auth.login(this.g.value).subscribe((data)=>{
      
      if(data.token && data.username){
        this.isSuccess=true;
        this.isDanger = false;
        this.auth.setToken(data.token);
        this.auth.setUsername(data.username);
        this.auth.setExpireDate(new Date(new Date().getTime() + (60 * 60 * 1000)));
        this.message=data.message;
        setTimeout(()=>{
         
        window.location.replace("http://localhost:4200/home");
        },2000)
      }else{
        this.isDanger=true;
        this.isSuccess= false;
        this.message=data.message;
      }
    })}
  }
  ngOnInit(){
    if(this.auth.isAuthenthicated()){
      this.isSuccess=true;
      this.isDanger = false;
      this.message= new String("you are already logged In!");
      window.location.replace("http://localhost:4200/home");
    }
  }
}
