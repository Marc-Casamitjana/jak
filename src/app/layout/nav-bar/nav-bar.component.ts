import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser: User;
  subsectionOpened = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (user: User) => (this.currentUser = user)
    );
  }
  openSubsection() {
    this.subsectionOpened = !this.subsectionOpened;
  }
}
