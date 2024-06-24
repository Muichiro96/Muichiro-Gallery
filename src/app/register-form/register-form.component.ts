import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Component, TemplateRef} from '@angular/core';
import {  AbstractControl, Validators ,FormGroup,FormControl, FormBuilder} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../auth.service';
import { error } from 'console';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  modalRef?: BsModalRef;
  register : FormGroup;
  isSubmitted: Boolean;
  message : String="";

  
 
  constructor(private fb : FormBuilder,private http : HttpClient,private authService: AuthService){
    this.register = this.fb.group({email: ['',[Validators.required,Validators.email]],
      username : ['',[Validators.required,Validators.minLength(8)]],
      password : ['',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)]],
      });
      this.isSubmitted = false;
      
  }
  

  
  get username(){
    return this.register.get('username');
  }
  get email(){
    return this.register.get('email');
  }
  get password(){
    return this.register.get('password');
  }
  signUp(){
    this.isSubmitted = true;
    console.log(this.register.value);
    if(this.register.valid){
      this.authService.register(this.register.value).subscribe((data) =>{
          console.log(data);
          this.message=data.message;
        }
    )
     } 
  }
 
}
