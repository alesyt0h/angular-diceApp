import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate, CanLoad {

    constructor(
        private _router: Router
    ){}

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
