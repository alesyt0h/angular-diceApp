import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from '../interfaces/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this._formBuilder.group({
    nickname: ['', [Validators.maxLength(15), Validators.minLength(4)] ],
    email: ['', [Validators.required, Validators.email] ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
  }

  register(){
    const { nickname, email, password } = this.registerForm.value;

    this._authService.register(nickname, email, password)
    .subscribe((resp: AuthResponse | HttpErrorResponse) => {
      if (this._authService.isAuthResponse(resp)){
        this._router.navigateByUrl('/');
      } else {
        Swal.fire('Error', resp.error.error, 'error');
      }
    });
  }
}
