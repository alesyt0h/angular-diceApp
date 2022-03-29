import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Ranking } from '../interfaces/ranking';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  result!: number | string;

  constructor(
    private _gameService: GameService
  ){}

  ngOnInit(): void {
    this._gameService.ranking().subscribe((resp: Ranking | HttpErrorResponse) => {
      if(this.isHttpErrorResponse(resp)){
        Swal.fire('Error', resp.error.message, 'error');
        this.result = resp.error.message;
      } else {
        this.result = resp.winning_percentage;
      }
    });
  }

  isHttpErrorResponse(object: any): object is HttpErrorResponse {
    return 'error' in object;
  }

  isNumber(data: number | string){
    return (typeof data === 'number') ? true : false;
  }

}
