import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
headers: HttpHeaders;
message : any;
constructor(private http : HttpClient,private auth:AuthService) {
  this.headers=new HttpHeaders().set('x-access-token',this.auth.getToken());
  
 }
 ngOnInit(): void {
  this.http.get("http://localhost:8080/test",{ headers: this.headers}).subscribe(
    (data)=>{console.log(data);
     
    this.message=Object.values(data);
  }

  )
 }
}
