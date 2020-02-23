import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(private authService: AuthService, private modal: ModalService) {}

  closeModal() {
    this.isOpenModalLogin.emit();
  }

  logIn(user: User) {
    this.authService
      .login(user.username, user.password)
      .pipe(first())
      .subscribe(
        next => this.closeModal(),
        error => console.log(error)
      );
    this.loginForm.reset();
    this.modal.close();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
}
