import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment';
import { AuthResponse, User, VerifyResponse } from '../auth/interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _apiUrl: string = environment.apiUrl;
    private _user!: User | null;
    private _admin: boolean = false;

    constructor(private _http: HttpClient) { }

    login(email: string, password: string) {
        return this._http.post<AuthResponse>(this._apiUrl + '/login', { email, password }).pipe(
            tap((resp: AuthResponse) => {
                localStorage.setItem('token', resp.access_token);
                this._user = { ...resp.user };
                this.saveUser();
            }),
            catchError(err => {
                return of(new HttpErrorResponse(err));
            })
        );
    }

    register(nickname: string, email: string, password: string) {
        return this._http.post<AuthResponse>(this._apiUrl, { nickname, email, password }).pipe(
            tap((resp: AuthResponse) => {
                localStorage.setItem('token', resp.access_token);
                this._user = { ...resp.user };
                this.saveUser();
            }),
            catchError(err => {
                return of(new HttpErrorResponse(err));
            })
        );
    }

    logout() {
        const headers = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this.getToken);

        return this._http.post<{message: string}>(this._apiUrl + '/logout', {}, { headers }).pipe(
            tap(resp => {
                localStorage.clear();
                this._user = null;
            }),
            catchError(err => {
                return of(new HttpErrorResponse(err));
            })
        );
    }

    verify(){
        const headers = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this.getToken || '');

        return this._http.get<VerifyResponse>(`${this._apiUrl}/verify`, {headers}).pipe(
            map((resp: VerifyResponse) => {
                this._user = resp.user;
                this._admin = resp.admin;
                this.saveUser();

                return {ok: (resp.user ? true : false), admin: resp.admin};
            }),
            catchError(err => {
                return of(new HttpErrorResponse(err));
            })
        );
    }

    saveUser() {
        localStorage.setItem('user', JSON.stringify(this._user));
    }

    setNewNickname(nickname: string){
        if(!nickname) nickname = 'Anonymous';

        this._user!.nickname = nickname;
        this.saveUser();
    }

    loadUser() {
        const user = localStorage.getItem('user') || '';
        if (user) {
            this._user = JSON.parse(user);
        }
    }

    get getToken() {
        return localStorage.getItem('token') || '';
    }

    isAuthResponse(object: any): object is AuthResponse {
        return 'access_token' in object;
    }

    get getUser() {
        return this._user;
    }

    get getAdmin() {
        return this._admin;
    }

}
