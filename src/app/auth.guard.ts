import {  Router ,CanActivateFn} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';



export const canActivateUser : CanActivateFn = (  route,  state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenthicated()) {
    return true;
  }
  else{
    router.navigate(["/login"]);
  return false;}
  };
