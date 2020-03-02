import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  currentUser: User;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user: User) => this.currentUser = user);
  }
}
