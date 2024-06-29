import { Injectable ,Inject ,PLATFORM_ID} from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
const url="http://localhost:8080/auth/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,@Inject(PLATFORM_ID) private platformId: Object){}
  register(credentials : any):Observable<any>{
    return this.http.post(url+"signUp",{email: credentials.email,
      username : credentials.username , password : credentials.password}
    );
  }
  login(credentials:any):Observable<any>{
  
    return this.http.post(url+"signIn",{username:credentials.username,password:credentials.password},httpOptions);
  }
  getUsername(): any{
    if(isPlatformBrowser(this.platformId)){
    return sessionStorage.getItem("username");}
  }
  getToken() : any{
    if(isPlatformBrowser(this.platformId)){
    return sessionStorage.getItem("Token");}
  }
  headerToken(): HttpHeaders{
    const headers=new HttpHeaders().set('x-access-token',this.getToken());
    return headers;

  }
  setExpireDate(date : Date){
    if(isPlatformBrowser(this.platformId)){
      window.sessionStorage.setItem("expireAt",date.toString());
    }
  }
  setUsername(username :string){
    if(isPlatformBrowser(this.platformId)){
    window.sessionStorage.setItem("username",username);}
  }
  setToken(token : string){
    if(isPlatformBrowser(this.platformId)){
      window.sessionStorage.setItem("Token",token);}
  }
  logOut(){
    if(isPlatformBrowser(this.platformId))
    window.sessionStorage.clear();
    window.location.replace("http://localhost:4200/home");
  }
  isAuthenthicated(): Boolean{
 if(this.getToken())
  { 
    return true;}
return false;
  }
 
}
