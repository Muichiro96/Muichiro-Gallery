import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient,private auth : AuthService) { }
  getUserFavorites(): Observable<any>{
    return this.http.get("http://localhost:8080/favorites/list",{ headers : this.auth.headerToken()});
  }
}
