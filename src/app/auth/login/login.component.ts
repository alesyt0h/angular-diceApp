import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../interfaces/interfaces';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email] ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ){}

  ngOnInit(): void {
  }

  login(){
    const {email, password} = this.loginForm.value;

    this._authService.login(email, password)
    .subscribe((resp: AuthResponse | HttpErrorResponse) => {
      if (this._authService.isAuthResponse(resp)){
        this._router.navigateByUrl('/');
      } else {
        Swal.fire('Error', resp.error.message, 'error');
      }
    });
  }
}
