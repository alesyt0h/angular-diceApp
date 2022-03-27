import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ThrowsResponse, Throw } from '../interfaces/throw';

@Component({
  selector: 'app-throws',
  templateUrl: './throws.component.html',
  styleUrls: ['./throws.component.css']
})
export class ThrowsComponent implements OnInit {

  throws!: Throw[];
  winningPercentage: number = 0;
  pageOfItems!: Array<any>;

  constructor(
    private _gameService: GameService
  ){}

  ngOnInit(): void {
    this._gameService.throws(this._gameService.getUserId).subscribe((resp: ThrowsResponse) => {
      this.throws = resp.throws;
      this.winningPercentage = resp.winning_percentage;
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
}

}
