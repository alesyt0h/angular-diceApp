import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Ranking } from '../interfaces/ranking';
import Swal from 'sweetalert2';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  result!: number | string;

  constructor(
    private _gameService: GameService,
    private _helper: HelperService
  ){}

  ngOnInit(): void {
    this._gameService.ranking().subscribe((resp: Ranking | HttpErrorResponse) => {
      if(this._helper.isHttpErrorResponse(resp)){
        Swal.fire('Error', resp.error.message, 'error');
        this.result = resp.error.message;
      } else {
        this.result = resp.winning_percentage;
      }
    });
  }

  isNumber(data: number | string){
    return (typeof data === 'number') ? true : false;
  }

}
