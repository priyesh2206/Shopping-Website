import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(private auth: AuthService, private router: Router) { }


  canActivate(route, state: RouterStateSnapshot)
  {
    return this.auth.user$.map(user => {
      if (user) return true; 

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    });

  }



}
