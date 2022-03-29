import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UpdateNicknameComponent } from './update-nickname/update-nickname.component';
import { DeleteThrowsComponent } from './delete-throws/delete-throws.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'update/:id', component: UpdateNicknameComponent},
      {path: 'delete/throws/:id', component: DeleteThrowsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
