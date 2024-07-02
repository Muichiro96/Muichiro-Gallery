import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient,private auth : AuthService) { }
  getUserLikesDislikes(): Observable<any>{
    return this.http.get("http://localhost:8080/like/list",{ headers : this.auth.headerToken()});
  }
}
