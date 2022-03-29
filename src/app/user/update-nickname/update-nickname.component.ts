import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../auth/interfaces/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UpdateResponse } from '../interfaces/update';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-update-nickname',
    templateUrl: './update-nickname.component.html',
    styleUrls: ['./update-nickname.component.css']
})
export class UpdateNicknameComponent implements OnInit {

    user!: User | null;
    nicknameForm!: FormGroup;

    constructor(
        private _authService: AuthService,
        private _userService: UserService,
        private _formBuilder: FormBuilder
    ){}

    ngOnInit(): void {
        this.user = this._authService.getUser;
        this.nicknameForm = this._formBuilder.group({
            nickname: [this.user?.nickname, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
        });
    }

    update(){
        const nickname = this.nicknameForm.value.nickname;

        this._userService.update(nickname).subscribe((resp: UpdateResponse | HttpErrorResponse) => {
            if(this.isHttpErrorResponse(resp)){
                if(resp.status === 400){
                    Swal.fire('Error', resp.error.error.nickname[0], 'error');
                } else if (resp.status === 409){
                    Swal.fire('Error', resp.error.error, 'error');
                }
            } else {
                Swal.fire('Success', resp.message, 'success');
                this._authService.setNewNickname(nickname);
            }
        });
    }

    get minLengthError(){
        return typeof this.nicknameForm.controls['nickname'].errors?.minlength !== 'undefined';
    }

    get maxLengthError(){
        return typeof this.nicknameForm.controls['nickname'].errors?.maxlength !== 'undefined';
    }

    isHttpErrorResponse(object: any): object is HttpErrorResponse {
        return 'error' in object;
    }

}
