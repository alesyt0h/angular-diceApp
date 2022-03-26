import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment';
import { AuthResponse, User } from '../auth/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl: string = environment.apiUrl;
  private _user!: User;

  constructor(private _http: HttpClient) { }

  login(email: string, password: string){
    return this._http.post<AuthResponse>(this._apiUrl + '/login', {email, password}).pipe(
        tap((resp: AuthResponse) => {
          localStorage.setItem('token', resp.access_token);
          this._user = {...resp.user};
        }),
        catchError(err => {
            return of(new HttpErrorResponse(err));
        })
      );
  }

  register(nickname: string, email: string, password: string){
    return this._http.post<AuthResponse>(this._apiUrl, {nickname, email, password}).pipe(
        tap((resp: AuthResponse) => {
          localStorage.setItem('token', resp.access_token);
          this._user = {...resp.user};
        }),
        catchError(err => {
            return of(new HttpErrorResponse(err));
        })
      );
  }

  get getUser(){
    return this._user;
  }

  isAuthResponse(object: any): object is AuthResponse {
    return 'access_token' in object;
  }

}
