import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() openModalEvent: EventEmitter<string> = new EventEmitter();
  currentUser: User;
  openedButtons = false;
  constructor(private authService: AuthService) {}

  openModal(type: string): void {
    this.openModalEvent.emit(type);
    this.openedButtons = !this.openedButtons;
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.authService.currentUser.subscribe(user => (this.currentUser = user));
  }
}
