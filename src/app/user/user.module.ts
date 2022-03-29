import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteThrowsComponent } from './delete-throws/delete-throws.component';
import { UpdateNicknameComponent } from './update-nickname/update-nickname.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeleteThrowsComponent,
    UpdateNicknameComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
