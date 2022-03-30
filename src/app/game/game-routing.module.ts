import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayerListComponent } from './player-list/player-list.component';
import { HomeComponent } from '../home/home.component';
import { PlayComponent } from './play/play.component';
import { ThrowsComponent } from './throws/throws.component';
import { RankingComponent } from './ranking/ranking.component';
import { LoserComponent } from './loser/loser.component';
import { WinnerComponent } from './winner/winner.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'play'},
      {path: 'play', component: PlayComponent},
      {path: 'players', component: PlayerListComponent, canLoad: [AdminGuard], canActivate: [AdminGuard]},
      {path: 'throws/:id', component: ThrowsComponent},
      {path: 'ranking', component: RankingComponent, canLoad: [AdminGuard], canActivate: [AdminGuard]},
      {path: 'ranking/loser', component: LoserComponent},
      {path: 'ranking/winner', component: WinnerComponent},
      {path: '404', component: ErrorPageComponent },
    ],
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
