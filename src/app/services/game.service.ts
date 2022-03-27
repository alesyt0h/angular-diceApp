import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowResponse, ThrowsResponse } from '../game/interfaces/throw';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl: string = environment.apiUrl;
  headers: HttpHeaders = new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.getToken);

  constructor(
    private _http: HttpClient
  ){}

  play(id: string){
    const url = `${this.apiUrl}/${id}/games`;

    return this._http.post<ThrowResponse>(url, {}, {headers: this.headers});
  }

  throws(id: number){
    const url = `${this.apiUrl}/${id}/games`;

    return this._http.get<ThrowsResponse>(url, {headers: this.headers});
  }

  get getToken(){
    return localStorage.getItem('token') || '';
  }

  get getUserId(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return user.id;
  }
}
