import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteThrowsComponent } from './delete-throws/delete-throws.component';
import { UpdateNicknameComponent } from './update-nickname/update-nickname.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    DeleteThrowsComponent,
    UpdateNicknameComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
