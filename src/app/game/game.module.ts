import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play/play.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { ThrowsComponent } from './throws/throws.component';
import { RankingComponent } from './ranking/ranking.component';
import { LoserComponent } from './loser/loser.component';
import { WinnerComponent } from './winner/winner.component';
import { GameRoutingModule } from './game-routing.module';



@NgModule({
  declarations: [
    PlayComponent,
    PlayerListComponent,
    ThrowsComponent,
    RankingComponent,
    LoserComponent,
    WinnerComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
