import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ThrowResponse, ThrowsResponse } from '../game/interfaces/throw';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Ranking, Loser, Winner } from '../game/interfaces/ranking';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl: string = environment.apiUrl;
  headers!: HttpHeaders;

  constructor(
    private _http: HttpClient
  ){}

  play(id: string){
    this.setHeaders();
    const url = `${this.apiUrl}/${id}/games`;

    return this._http.post<ThrowResponse>(url, {}, {headers: this.headers});
  }

  throws(id: number){
    this.setHeaders();
    const url = `${this.apiUrl}/${id}/games`;

    return this._http.get<ThrowsResponse>(url, {headers: this.headers});
  }

  ranking(){
    this.setHeaders();
    const url = `${this.apiUrl}/ranking`;

    return this._http.get<Ranking>(url, {headers: this.headers}).pipe(
      catchError(err => {
          return of(new HttpErrorResponse(err));
      })
    )
  }

  loser(){
    this.setHeaders();
    const url = `${this.apiUrl}/ranking/loser`;

    return this._http.get<Loser>(url, {headers: this.headers}).pipe(
      catchError(err => {
          return of(new HttpErrorResponse(err));
      })
    );
  }

  winner(){
    this.setHeaders();
    const url = `${this.apiUrl}/ranking/winner`;

    return this._http.get<Winner>(url, {headers: this.headers}).pipe(
      catchError(err => {
          return of(new HttpErrorResponse(err));
      })
    );
  }

  get getToken(){
    return localStorage.getItem('token');
  }

  get getUserId(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return user.id;
  }

  setHeaders(){
    this.headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.getToken);
  }
}
