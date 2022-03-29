import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { User } from '../../auth/interfaces/interfaces';
import { Players } from '../interfaces/playerList';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  loading: boolean = true;
  players: User[] = [];
  pageOfItems!: Array<any>;

  constructor(
    private _gameService: GameService
  ){}

  ngOnInit(): void {
    this._gameService.playerList().subscribe((resp: Players | HttpErrorResponse) => {
      if(this.isHttpErrorResponse(resp)){
        Swal.fire('Error', resp.error.message, 'error')
      } else if(resp.users){
        this.players = resp.users;
        this.loading = false;
      } else {
        this.loading = false;
      }
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  isHttpErrorResponse(object: any): object is HttpErrorResponse {
    return 'error' in object;
  }
}
