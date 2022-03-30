import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private _router: Router,
        private _authService: AuthService
    ){}

    canActivate(): Observable<boolean> | boolean {

        return this._authService.verify().pipe(
            map((resp: any) => {
                if(this.isHttpErrorResponse(resp) || !resp.ok){
                    this._router.navigateByUrl('/auth/login')
                }

                return true;
            })
        );
    }

    canLoad(): Observable<boolean> | boolean {
        return this._authService.verify().pipe(
            map((resp: any) => {
                if(this.isHttpErrorResponse(resp) || !resp.ok){
                    this._router.navigateByUrl('/auth/login')
                }

                return true;
            })
        );
    }

    isHttpErrorResponse(object: any): object is HttpErrorResponse {
        return 'error' in object;
    }
}
