import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';
import { ModalService } from '../../layout/modal/modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: any;

  constructor(private authService: AuthService, private modal: ModalService) {}

  signIn(user: User) {
    if (!this.validateForm()) {
      return;
    }
    this.authService.register(user).subscribe(
      () => {
        this.modal.close();
        this.registerForm.reset();
      },
      (error: HttpErrorResponse) => this.errors.push(error.error.message)
    );
  }

  validateForm() {
    this.errors = [];
    if (
      this.registerForm.get('password').value !==
      this.registerForm.get('passwordRep').value
    ) {
      this.errors.push('Passwords does not match');
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordRep: new FormControl('', Validators.required)
    });
  }
}
