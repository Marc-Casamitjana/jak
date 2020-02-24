import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { first } from 'rxjs/operators';
import { ModalService } from '../layout/modal/modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any;

  constructor(private authService: AuthService, private modal: ModalService) {}

  get ctrls() {
    return this.loginForm.controls;
  }

  logIn(loginForm: FormGroup) {
    if (loginForm.invalid) {
      this.validateForm();
      return;
    }
    this.errors = [];
    this.authService
      .login(loginForm.value.username, loginForm.value.password)
      .pipe(first())
      .subscribe(
        () => {
          this.modal.close();
          this.loginForm.reset();
        },
        (error: HttpErrorResponse) => this.errors.push(error.error.message)
      );
  }

  validateForm() {
    this.errors = [];
    if (this.loginForm.get('username').errors) {
      this.errors.push('username');
    }

    if (this.loginForm.get('password').errors) {
      this.errors.push('password');
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
}
