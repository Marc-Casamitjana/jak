import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {
  blur = false;
  isFriendsBoxShown: boolean;
  constructor() {}

  showAddFriendsBox() {
    this.isFriendsBoxShown = !this.isFriendsBoxShown;
  }

  ngOnInit() {}
}
