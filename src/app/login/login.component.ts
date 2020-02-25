import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, User } from '../core/services/auth.service';
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

  logIn(user: User) {
    this.errors = [];
    this.authService
      .login(user.username, user.password)
      .pipe(first())
      .subscribe(
        () => {
          this.modal.close();
          this.loginForm.reset();
        },
        (error: HttpErrorResponse) => this.errors.push(error.error.message)
      );
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
}
