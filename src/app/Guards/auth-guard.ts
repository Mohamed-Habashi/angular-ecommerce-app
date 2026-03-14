import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../services/login-service';

export const authGuard: CanActivateFn = (route, state) => {
  let loginService=inject(LoginService);
  let router=inject(Router);
  if(loginService.checkLogin()){
    return true;
  }else{
    router.navigateByUrl('/Login');
    return false;
  }
};
