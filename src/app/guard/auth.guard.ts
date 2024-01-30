import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  if(username && username === 'admin' && password && password === "admin123"){
    return true;
  } else {
    const routerService = inject(Router);
    return routerService.createUrlTree(['/app'])
    // return false;
  }
};
