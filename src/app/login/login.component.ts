import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() isOpenModalLogin: EventEmitter<void> = new EventEmitter();
  constructor() { }

  closeModal() {
    this.isOpenModalLogin.emit();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

}
