import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  isOpenModalLogin = false;
  name = 'Angular';

  openLoginModal() {
    this.isOpenModalLogin = !this.isOpenModalLogin;
  }

  closeLoginModal() {
    this.isOpenModalLogin = false;
  }
}


