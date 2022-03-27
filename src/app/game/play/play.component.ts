import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { Throw, ThrowResponse } from '../interfaces/throw';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  thrown: boolean = false;
  lastThrow!: Throw;

  constructor(
    private _gameService: GameService
  ){}

  ngOnInit(): void {
  }

  play(id: string){
    this._gameService.play(id).subscribe((resp: ThrowResponse) => {
      console.log(resp);
      this.thrown = true;
      this.lastThrow = resp.result;
    });
  }

  getUserId(){
    return this._gameService.getUserId;
  }

}
