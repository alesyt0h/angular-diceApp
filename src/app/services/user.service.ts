import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UpdateResponse } from '../user/interfaces/update';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    apiUrl: string = environment.apiUrl;
    headers!: HttpHeaders;

    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ){}

    update(nickname: string){
        this.setHeaders();

        return this._http.put<UpdateResponse>(`${this.apiUrl}/${this.getUserId}`, {nickname}, {headers: this.headers}).pipe(
            catchError(err => {
                return of(new HttpErrorResponse(err));
            })
        )
    }

    get getUserId(){
        return this._authService.getUser?.id;
    }

    get getToken(){
        return localStorage.getItem('token');
    }

    setHeaders(){
        this.headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.getToken);
    }
}
