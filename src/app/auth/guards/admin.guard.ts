import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) {}

    canActivate(): Observable<boolean> | boolean {

        return this._authService.verify().pipe(
            map((resp: any) => {
                console.log(resp)
                if (this.isHttpErrorResponse(resp) || !resp.admin) {
                    this._router.navigateByUrl('/play')
                }

                return true;
            })
        );
    }

    canLoad(): Observable<boolean> | boolean {
        return this._authService.verify().pipe(
            map((resp: any) => {
                console.log(resp)

                if (this.isHttpErrorResponse(resp) || !resp.admin) {
                    this._router.navigateByUrl('/play')
                }

                return true;
            })
        );
    }

    isHttpErrorResponse(object: any): object is HttpErrorResponse {
        return 'error' in object;
    }
}
