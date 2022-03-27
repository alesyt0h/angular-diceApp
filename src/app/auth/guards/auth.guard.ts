import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  constructor(private _router: Router){}

  redirect: Promise<boolean> = this._router.navigateByUrl('/play');

  canActivate(): Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return (token && user) ? this.redirect : true;
  }
  canLoad(): Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return (token && user) ? this.redirect : true;
  }
}
