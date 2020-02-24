import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, User } from '../core/services/auth.service';
import { first } from 'rxjs/operators';
import { ModalService } from '../layout/modal/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() isOpenModalLogin: EventEmitter<void> = new EventEmitter();
  errors: string;

  constructor(private authService: AuthService, private modal: ModalService) {}

  closeModal() {
    this.isOpenModalLogin.emit();
  }

  logIn(loginForm: FormGroup) {
    if (loginForm.invalid) {
      this.validateForm();
      return;
    }
    this.authService
      .login(loginForm.value.username, loginForm.value.password)
      .pipe(first())
      .subscribe(
        next => this.closeModal(),
        error => console.log(error)
      );
    this.loginForm.reset();
    this.modal.close();
  }

  validateForm() {
    Object.keys(this.loginForm.controls).forEach(e => {
      const control = this.loginForm.controls[e];
      if (control.invalid) {
        this.errors = 'Invalid credentials'
      }
    });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
}
