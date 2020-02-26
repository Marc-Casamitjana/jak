import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ModalService } from './layout/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpenModalLogin = false;
  isOpenModal = false;
  openedModal: string;

  constructor(
    private modal: ModalService
  ) {}

  openModal(type) {
    this.isOpenModal = true;
    this.modal.open(type);
  }
}
