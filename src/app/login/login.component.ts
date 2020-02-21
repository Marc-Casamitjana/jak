import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService, User } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() isOpenModalLogin: EventEmitter<void> = new EventEmitter();

  constructor(private authService: AuthService) {}

  closeModal() {
    this.isOpenModalLogin.emit();
  }

  logIn(user: User) {
    this.authService.login(user).subscribe();
    this.loginForm.reset();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
}
