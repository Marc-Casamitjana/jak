import { Component, OnInit } from '@angular/core';
import { SocialService } from './social.service';
import { User } from 'src/app/core/services/auth.service';
import { AuthService } from '../../core/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';

export interface UsersData {
  currentUsername: string;
  friendName: string;
}

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('1s ease-out', style({ height: 150, opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: 150, opacity: 1 }),
        animate('1s ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class SocialComponent implements OnInit {
  blur = false;
  isFriendsBoxShown: boolean;
  newFriendMsg: string;
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
      friendName: name
    };
    this.socialService.getFriend(usersData).subscribe(
      (username: string) => (this.newFriendMsg = username),
      (err: HttpErrorResponse) => (this.newFriendMsg = err.error)
    );
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (user: User) => (this.currentUser = user)
    );
  }
}
