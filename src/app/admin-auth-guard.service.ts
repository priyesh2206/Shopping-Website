import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
  }
}
