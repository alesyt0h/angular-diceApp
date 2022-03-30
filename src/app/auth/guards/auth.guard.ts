import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from '../../services/helper.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private _router: Router,
        private _authService: AuthService,
        private _helper: HelperService
    ){}

    canActivate(): Observable<boolean> | boolean {

        return this._authService.verify().pipe(
            map((resp: any) => {
                if(this._helper.isHttpErrorResponse(resp) || !resp.ok){
                    this._router.navigateByUrl('/auth/login')
                }

                return true;
            })
        );
    }

    canLoad(): Observable<boolean> | boolean {
        return this._authService.verify().pipe(
            map((resp: any) => {
                if(this._helper.isHttpErrorResponse(resp) || !resp.ok){
                    this._router.navigateByUrl('/auth/login')
                }

                return true;
            })
        );
    }
}
