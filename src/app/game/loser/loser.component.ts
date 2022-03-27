import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Loser } from '../interfaces/ranking';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../auth/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loser',
  templateUrl: './loser.component.html',
  styleUrls: ['./loser.component.css']
})
export class LoserComponent implements OnInit {

  user!: User;
  loading: boolean = true;

  constructor(
    private _gameService: GameService
  ){}

  ngOnInit(): void {
    this._gameService.loser().subscribe((resp: Loser | HttpErrorResponse) => {
     if(this.isHttpErrorResponse(resp)){
        Swal.fire('Error', resp.error.message, 'error')
      } else if(resp.loser){
        this.user = resp.loser;
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  isHttpErrorResponse(object: any): object is HttpErrorResponse {
    return 'error' in object;
  }

}
