import { Component, OnInit } from '@angular/core';
import { SocialService } from './social.service';
import { User } from 'src/app/core/services/auth.service';
import { AuthService } from '../../core/services/auth.service';

export interface UsersData {
  currentUsername: string;
  friendName: string;
}

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  blur = false;
  isFriendsBoxShown: boolean;
  friendName: string;
  currentUser: User;

  constructor(
    private socialService: SocialService,
    private authService: AuthService
  ) {}

  showAddFriendsBox() {
    this.isFriendsBoxShown = !this.isFriendsBoxShown;
  }

  addNewFriend(name: string) {
    const usersData: UsersData = {
      currentUsername: this.currentUser.username,
      friendName: name,
    };
    let friendName: string;
    this.socialService
      .getFriend(usersData)
      .subscribe((username: string) => (friendName = username), (err) => console.log(err.message)
      );
    this.friendName = friendName;
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((
      user: User) => this.currentUser = user);
  }
}
