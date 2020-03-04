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
  searchedFriend: string;

  constructor(private socialService: SocialService) {}

  showAddFriendsBox() {
    this.isFriendsBoxShown = !this.isFriendsBoxShown;
  }

  addNewFriend(name) {
    let friend: User;
    this.socialService.getFriend(name).subscribe(user => (friend = user));
    console.log(friend);
  }

  ngOnInit() {}
}
