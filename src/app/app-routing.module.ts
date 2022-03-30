import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './auth/guards/logged.guard';

const routes: Routes = [
    { path: '', loadChildren: () => import('./game/game.module').then(m => m.GameModule) },
    {
        path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canLoad: [LoggedGuard], canActivate: [LoggedGuard]
    },
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
