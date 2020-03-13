import { Component, OnInit } from '@angular/core';
import { SocialService } from './social.service';
import { User, HttpResponse } from 'src/app/core/services/auth.service';
import { AuthService } from '../../core/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { flatMap, tap, switchMap } from 'rxjs/operators';
import { UsersService, Notification } from '../users/users.service';
import { concat } from 'rxjs';

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
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate(
          '0.3s ease-in',
          style({ opacity: 1, transform: 'translateY(0%)' })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SocialComponent implements OnInit {
  blur = false;
  isFriendsBoxShown: boolean;
  newFriendMsg: string;
  newFriendError: string;
  currentUser: User;
  friendRequest: Notification[] = [];

  constructor(
    private socialService: SocialService,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  showAddFriendsBox() {
    this.isFriendsBoxShown = !this.isFriendsBoxShown;
  }

  addNewFriend(name: string) {
    this.newFriendMsg = undefined;
    this.newFriendError = undefined;

    const usersData: UsersData = {
      currentUsername: this.currentUser.username,
      friendName: name
    };
    this.socialService
      .getFriend(usersData)
      .pipe(
        switchMap((response: HttpResponse) => {
          const payload = {
            requestedUser: response.data,
            user: this.currentUser
          };
          return this.socialService.sendFriendRequest(payload);
        })
      )
      .subscribe(
        (msg: HttpResponse) => (this.newFriendMsg = msg.data),
        (err: HttpErrorResponse) => (this.newFriendError = err.error.data)
      );
    this.clearMessagesAfterDelay();
  }

  classify(notifications: Notification[]) {
    notifications.forEach((notification: Notification) => {
      this[notification.type].push(notification);
    });
  }

  clearMessagesAfterDelay() {
    setTimeout(() => {
      this.newFriendError = undefined;
      this.newFriendMsg = undefined;
    }, 3000);
  }

  resolveRequest(username: string, isAccepted: boolean) {
    concat(
      this.socialService.resolveFriendRequest(
        username,
        isAccepted,
        this.currentUser.username
      ),
      this.userService.getNotifications(this.currentUser)
    ).subscribe(e => {
      if (Array.isArray(e.data) && e.data) {
        console.log(e.data);

        this.friendRequest = [];
        this.classify(e.data);
      }
    });
  }

  openPrivate() {
    const requestedUser = 'rooter';
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(e => this.currentUser = e)
    this.userService
      .getNotifications(this.currentUser)
      .subscribe((notifications: HttpResponse) => {
        if (notifications.data) {
          this.classify(notifications.data);
        }
      });
    console.log(this.authService.currentUserValue);
  }
}
