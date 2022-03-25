import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this._formBuilder.group({
    email: ['admin@admin.com', [Validators.required, Validators.email] ],
    password: ['password', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private _formBuilder: FormBuilder,
              private _authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    const {email, password} = this.loginForm.value;

    this._authService.login(email, password)
    .subscribe((resp: AuthResponse | HttpErrorResponse) => {
      if (this.isAuthResponse(resp)){
        console.log(resp.access_token);
      } else {
        console.log(resp.error.message);
      }
    });
  }

  isAuthResponse(object: any): object is AuthResponse {
    return 'access_token' in object;
  }

}
