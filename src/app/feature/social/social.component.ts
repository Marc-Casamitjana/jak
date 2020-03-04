import { Component, OnInit } from '@angular/core';
import { SocialService } from './social.service';
import { User } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  blur = false;
  isFriendsBoxShown: boolean;
  friendName: string;

  constructor(private socialService: SocialService) {}

  showAddFriendsBox() {
    this.isFriendsBoxShown = !this.isFriendsBoxShown;
  }

  addNewFriend(name: string) {
    let friendName: string;
    this.socialService.getFriend(name).subscribe((username: string) => (friendName = username));
    this.friendName = friendName;
  }

  ngOnInit() {}
}
