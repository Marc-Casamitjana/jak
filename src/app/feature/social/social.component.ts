import { Component, OnInit } from '@angular/core';
import { SocialService } from './social.service';
import { User, HttpResponse } from 'src/app/core/services/auth.service';
import { AuthService } from '../../core/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { flatMap, tap, switchMap, map } from 'rxjs/operators';
import { UsersService, Notification } from '../users/users.service';
import { concat, forkJoin } from 'rxjs';

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
  friends: any[];

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
    forkJoin({
      friendRequest: this.socialService.resolveFriendRequest(
        username,
        isAccepted,
        this.currentUser.username
      ),
      notifications: this.userService.getNotifications(this.currentUser),
      friends: this.userService.getFriends()
    }).subscribe(response => {
      const { notifications, friends } = response;
      console.log(response);
      
      // this.friendRequest = nto
      // if (Array.isArray(e.data) && e.data) {
      //   console.log(e.data);
      //   this.friendRequest = [];
      //   this.classify(e.data);
      // }
    });
  }

  openPrivate() {
    const requestedUser = 'rooter';
  }

  getUserData() {
    this.authService.currentUser
      .pipe(
        switchMap((user: User) => {
          this.currentUser = user;
          return forkJoin({
            notifications: this.userService.getNotifications(this.currentUser),
            friends: this.userService.getFriends()
          });
        })
      )
      .subscribe(response => {
        const { notifications, friends } = response;
        this.classify(notifications.data);
        this.friends = friends.data;
      });
  }

  ngOnInit() {
    this.getUserData();
  }
}
