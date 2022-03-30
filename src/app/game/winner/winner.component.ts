import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Winner } from '../interfaces/ranking';
import { User } from '../../auth/interfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  user!: User;
  loading: boolean = true;

  constructor(
    private _gameService: GameService,
    private _helper: HelperService
  ){}

  ngOnInit(): void {
    this._gameService.winner().subscribe((resp: Winner | HttpErrorResponse) => {
     if(this._helper.isHttpErrorResponse(resp)){
        Swal.fire('Error', resp.error.message, 'error')
      } else if(resp.winner){
        this.user = resp.winner;
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

}
