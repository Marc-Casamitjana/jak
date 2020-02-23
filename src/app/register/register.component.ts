import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService, User } from '../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() isOpenSignInModal: EventEmitter<void> = new EventEmitter();
  registerForm: FormGroup;

  constructor(private authService: AuthService) {}

  closeModal() {
    this.isOpenSignInModal.emit();
  }

  signIn(user: User) {
    this.authService.register(user).subscribe(
      next => this.closeModal(),
      error => console.log(error)
    );
    this.registerForm.reset();
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      passwordRep: new FormControl('')
    });
  }
}
