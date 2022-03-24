import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { GameGuard } from './auth/guards/game.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./game/game.module').then(m => m.GameModule),
    canLoad: [GameGuard], canActivate: [GameGuard]
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
