import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  getReviews(id:string): Observable<any> {
    return this.http.get(`http://localhost:8080/review/list/${id}`,{ headers : this.auth.headerToken()});
  }

  constructor(private http: HttpClient,private auth : AuthService) { }
  getPublications(){
    return this.http.get('http://localhost:8080/publication/list',{ headers : this.auth.headerToken()});
  }
  getPublication(id:string,title:string){
    return this.http.get(`http://localhost:8080/publication/${id}/${title}`,{ headers : this.auth.headerToken()});
  }
  editPublication(id: string,parameters : any){
    return this.http.put(`http://localhost:8080/publication/edit/${id}`,{
      title : parameters.title,
      description : parameters.description,
    },{ headers : this.auth.headerToken()});

  }
  createReview(params:any){
    return this.http.post("http://localhost:8080/review/publish",params,{ headers : this.auth.headerToken()});

  }
  hasReview(id: string){
    return this.http.get(`http://localhost:8080/review/has/${id}`,{ headers : this.auth.headerToken()});
  }
  createPublication(formData :FormData){
    return this.http.post("http://localhost:8080/publish",formData,{ headers : this.auth.headerToken()});

  }
  
  getAverageRate(id:string){
    return this.http.get(`http://localhost:8080/review/avg/${id}`,{ headers : this.auth.headerToken()});}
  deletePublication(id: string){
    return this.http.delete(`http://localhost:8000/publication/delete/${id}`,{});

  }
}
