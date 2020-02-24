import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  currentUser: any;
  @Output() openModalEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  openModal(type: string): void {
    this.openModalEvent.emit(type);
  }

  logout() {
    this.authService.logout();
  }
}
