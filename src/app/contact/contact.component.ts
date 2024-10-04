import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
 private subscriptions: Subscription = new Subscription();
fg : FormGroup;
response : String="";
isSubmitted: any;
isDanger: any;
isSuccess: any;
constructor(private fb : FormBuilder,private http : HttpClient) {
  this.fg=this.fb.group({
    name : ['',[Validators.required]],
    email : ['',[Validators.required,Validators.email]],
    message: ['',[Validators.required]],

  });  
 }
 get name(){
  return this.fg.get('name');
 }
 get email(){
  return this.fg.get('email');
 }
 get message(){
  return this.fg.get('message');
 }
 onSubmit(){
  this.isSubmitted=true;
  if(this.fg.valid){
    let post : Observable<any>=this.http.post("http://localhost:8080/send_message",{
      name : this.fg.value.name,
      email: this.fg.value.email,
      message: this.fg.value.message
    });
    this.subscriptions.add(post.subscribe((data)=>{
      
      
        
        this.response=data.message;

      
    }));
  }
 }
 ngOnInit(): void {
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  
}
